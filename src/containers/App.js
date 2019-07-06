import React, { Component } from 'react';
import classes from './App.module.css';
import Items from '../components/Items/Items';
import Selector from '../components/Selector/Selector';
import Results from '../components/Results/Results';
import "@firebase/polyfill";
import firebase from 'firebase';

class App extends Component {
    constructor() {
        super();
        this.state = {
            // stores => [{id: '-Lf...', name: '호시', checked: false}, ...]
            stores: [],
            votes: [

            ],
            // selectedStores => ['육개장', '호시', ... ]
            selectedStores: [],
            sender: '',
            password: '',

        };
        this.storesRef = firebase.database().ref('stores');
        this.votesRef = firebase.database().ref('votes');
    }

    //////////////////////////////////////////////////////////////////////////////////
    //-------------------------------- FOR SELECTOR --------------------------------//
    //////////////////////////////////////////////////////////////////////////////////
    storeConfirm = () => {
        // validate the number of selected stores
        const length = this.state.selectedStores.length;
        if (length === 0) {
            alert('가게는 적어도 1개 이상 선택하세요.');
            return;
        }
        // validate the sender name
        if (this.state.sender === '') {
            alert('제출자는 꼭 입력해야 합니다.');
            return;
        }

        // send the stores to the server        
        const today = new Date();
        // - set the key value
        const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        // - set the time property
        const timeVal = `${today.getHours()}시 ${today.getMinutes()}분`;
        // - prepare information object
        const infoObj = {
            name: this.state.sender,
            password: this.state.password,
            time: timeVal,
            picks: {}
        }
        // - max number of pick is 3        
        const lengthPick = length > 3 ? 3 : length;
        // - set the pick property
        for (var i = 0; i < lengthPick; i++) {
            infoObj.picks[i] = this.state.selectedStores[i];
        }
        // - send it to the server
        this.votesRef.child(dateRef).push(infoObj);

        // - clear picks
        this.setState({ selectedStores: [], sender: '', password: '', });

    }

    storeReset = () => {
        // set selectedStores empty
        this.setState({ selectedStores: [] });
    }

    selectRandomly = () => {
        const numOfStores = this.state.stores.length;
        // defense against when stores haven't been fetched or
        // the number of stores is less than 3
        if (numOfStores < 3) {
            return;
        }

        var random1 = Math.floor(Math.random() * numOfStores);
        var random2 = Math.floor(Math.random() * numOfStores);
        var random3 = Math.floor(Math.random() * numOfStores);

        while (random2 === random1) {
            random2 = Math.floor(Math.random() * numOfStores);
        };
        while (random3 === random1 || random3 === random2) {
            random3 = Math.floor(Math.random() * numOfStores);
        }

        const randomStore1 = this.state.stores[random1].name;
        const randomStore2 = this.state.stores[random2].name;
        const randomStore3 = this.state.stores[random3].name;

        const newSelectedStores = [];
        newSelectedStores.push(randomStore1, randomStore2, randomStore3);
        this.setState({ selectedStores: newSelectedStores });
    }

    storeClickedInPickedList = (index) => {
        const newSelectedStores = [...this.state.selectedStores];
        newSelectedStores.splice(index, 1);
        this.setState({ selectedStores: newSelectedStores })
    }

    typedSender = (event) => {
        this.setState({ sender: event.target.value });
    }

    typedPassword = (event) => {
        this.setState({ password: event.target.value });
    }

    //////////////////////////////////////////////////////////////////////////////////
    //--------------------------------- FOR ITEMS ----------------------------------//
    //////////////////////////////////////////////////////////////////////////////////
    storeClicked = (event) => {
        // highlight selected store

        // add the store id and name to the selected stores        
        const newSelectedStores = [...this.state.selectedStores];
        newSelectedStores.push(event.target.id);

        // update the state
        this.setState({ selectedStores: newSelectedStores });
    }

    handleChecked = (event) => {
        // find the id of the target
        const id = event.target.id;

        // find the index of the target in the stores
        const index = this.state.stores.findIndex(store => { return store.id === id });

        // update the store        
        const updatedStore = { ...this.state.stores[index] };
        updatedStore.checked = event.target.checked;

        // insert the store into the stores
        const stores = [...this.state.stores];
        stores[index] = updatedStore;

        // update the state
        this.setState({ stores: stores });
    }

    delBtnClicked = () => {
        // find the checked stores
        const checkedStores = [];
        this.state.stores.forEach((store) => {
            if (store.checked === true) {
                checkedStores.push(store.id);
            }
        });

        // request to the server to delete the stores
        if (checkedStores.length > 0) {
            checkedStores.forEach((checkedStore) => {
                this.storesRef.child(checkedStore).remove();
            })
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    //-------------------------------- FOR RESULTS ---------------------------------//
    //////////////////////////////////////////////////////////////////////////////////
    delVoteBtnClicked = (event) => {

        const answer = window.confirm('해당 투표 삭제할까요?');
        if (answer) {
            const today = new Date();
            const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            this.votesRef.child(dateRef).child(event.target.id).remove();
        }
    }

    showVoteBtnClicked = (event) => {
        const messagePicks = (picks) =>
            `1픽 ${picks[0]}\n2픽 ${picks[1]}\n3픽 ${picks[2]}`;

        const id = event.target.id;
        const theVote = this.state.votes.filter((vote) =>
            vote.id === id
        );

        const answer = prompt('비번 입력 하세요');
        if (answer === theVote[0].password) {
            alert(messagePicks(theVote[0].picks));
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    //---------------------------------- FOR APP -----------------------------------//
    //////////////////////////////////////////////////////////////////////////////////
    componentDidMount() {
        // retrieve store list
        this.storesRef.on('value', (snapshot) => {
            const newStores = [];
            for (var key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    var store = {
                        id: key,
                        name: snapshot.val()[key].name,
                        checked: false
                    }
                    newStores.push(store);
                }
            }
            this.setState({ stores: newStores });
        });

        // retrieve votes for today
        this.votesRef.on('value', (snapshot) => {
            const today = new Date();
            const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const votesObj = snapshot.child(dateRef).val();
            const newVotes = [];

            for (var key in votesObj) {
                if (votesObj.hasOwnProperty(key)) {
                    var vote = {
                        id: key,
                        name: votesObj[key].name,
                        password: votesObj[key].password,
                        picks: votesObj[key].picks,
                        time: votesObj[key].time
                    }
                    newVotes.push(vote);
                }
            }
            this.setState({ votes: newVotes });
        });
    }

    render() {

        return (
            <div className={classes.App}>
                <Items stores={this.state.stores}
                    onCheckedChange={this.handleChecked.bind(this)}
                    delBtnClicked={this.delBtnClicked.bind(this)}
                    storeClicked={this.storeClicked.bind(this)} />
                <Selector selectedStores={this.state.selectedStores}
                    storeReset={this.storeReset.bind(this)}
                    storeConfirm={this.storeConfirm.bind(this)}
                    selectRandomly={this.selectRandomly.bind(this)}
                    sender={this.state.sender}
                    password={this.state.password}
                    typedSender={this.typedSender.bind(this)}
                    typedPassword={this.typedPassword.bind(this)}
                    storeClickedInPickedList={this.storeClickedInPickedList.bind(this)} />
                <Results votes={this.state.votes}
                    delVoteBtnClicked={this.delVoteBtnClicked.bind(this)}
                    showVoteBtnClicked={this.showVoteBtnClicked.bind(this)} />
            </div>
        );
    }
}

export default App;