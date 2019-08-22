import React, { Component } from 'react';
import classes from './App.module.css';
import Items from '../components/Items/Items';
import Selector from '../components/Selector/Selector';
import Results from '../components/Results/Results';
import "@firebase/polyfill";
import firebase from 'firebase';

class App extends Component {
    criteria = new Date(2019, 7, 1, 11, 30);

    constructor() {
        super();
        this.state = {
            // stores => [{id: '-Lf...', name: '호시', checked: false}, ...]
            stores: [],
            votes: [],
            passes: [],
            reveal: {

            },
            // selectedStores => ['육개장', '호시', ... ]
            selectedStores: [],
            sender: '',
            password: '',
        };
        this.storesRef = firebase.database().ref('stores');
        this.votesRef = firebase.database().ref('votes');
    }

    //////////////////////////////////////////////////////////////////////////////////
    //---------------------------------- HELPERS -----------------------------------//
    //////////////////////////////////////////////////////////////////////////////////
    HoursMinutesComparer(date1, date2) {
        if (date1.getHours() > date2.getHours()) {
            return -1;
        }

        if (date1.getHours() < date2.getHours()) {
            return 1;
        }

        if (date1.getHours() === date2.getHours()) {
            if (date1.getMinutes() > date2.getMinutes()) {
                return -1;
            }

            if (date1.getMinutes() < date2.getMinutes()) {
                return 1;
            }

            if (date1.getMinutes() === date2.getMinutes()) {
                return 0;
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    //-------------------------------- FOR SELECTOR --------------------------------//
    //////////////////////////////////////////////////////////////////////////////////
    storeConfirm = () => {
        const today = new Date();

        // validate time-fence
        const fence = this.HoursMinutesComparer(this.criteria, today);
        if (fence !== -1) {
            alert('결과가 공개된 후이므로 더 이상의 투표는 불가합니다.');
            return;
        }

        // TODO: validate reveal status
        if (this.state.reveal !== null && this.state.reveal !== undefined) {
            if (this.state.reveal.pushed === true) {
                alert('결과가 공개된 후이므로 더 이상의 투표는 불가합니다.');
                return;
            }
        }

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
        this.votesRef.child(dateRef).child('papers').push(infoObj);

        // - clear picks
        this.setState({ selectedStores: [], sender: '', password: '', });

    }

    passConfirm = () => {
        const today = new Date();

        // validate time-fence
        const fence = this.HoursMinutesComparer(this.criteria, today);
        if (fence !== -1) {
            alert('결과가 공개된 후이므로 더 이상의 투표는 불가합니다.');
            return;
        }

        // TODO: validate reveal status
        if (this.state.reveal !== null && this.state.reveal !== undefined) {
            if (this.state.reveal.pushed === true) {
                alert('결과가 공개된 후이므로 더 이상의 투표는 불가합니다.');
                return;
            }
        }

        // validate the sender name
        if (this.state.sender === '') {
            alert('제출자는 꼭 입력해야 합니다.');
            return;
        }

        // - set the key value
        const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        // - set the time property
        const timeVal = `${today.getHours()}시 ${today.getMinutes()}분`;
        // - prepare information object
        const infoObj = {
            name: this.state.sender,
            time: timeVal,
        }

        // - send it to the server
        this.votesRef.child(dateRef).child('passes').push(infoObj);

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
            this.votesRef.child(dateRef).child('papers').child(event.target.id).remove();
        }
    }

    delPassBtnClicked = (event) => {

        const answer = window.confirm('해당 투표 삭제할까요?');
        if (answer) {
            const today = new Date();
            const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            this.votesRef.child(dateRef).child('passes').child(event.target.id).remove();
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

        // secret code
        if (answer === '비공개') {
            const today = new Date();
            const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const timeVal = `${today.getHours()}시 ${today.getMinutes()}분`;

            // - prepare information object
            const revealObj = {
                time: timeVal,
                pushed: false,
            };

            // - send it to the server
            this.votesRef.child(dateRef).child('states').child('reveal').set(revealObj);
        }
    }

    revealBtnClicked = () => {
        const result = prompt('\'공개\'라고 적으세요');
        if (result !== '공개') {
            return;
        }

        const today = new Date();
        const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const timeVal = `${today.getHours()}시 ${today.getMinutes()}분`;

        // - prepare information object
        const revealObj = {
            time: timeVal,
            pushed: true,
        };

        // - send it to the server
        this.votesRef.child(dateRef).child('states').child('reveal').set(revealObj);
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

        // retrieve reveal states
        const today = new Date();
        const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        this.votesRef.child(dateRef).child('states').child('reveal').on('value', (snapshot) => {
            const newReveal = snapshot.val();
            this.setState({ reveal: newReveal });
        });

        // retrieve papers for today
        this.votesRef.on('value', (snapshot) => {
            const today = new Date();
            const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const votesObj = snapshot.child(dateRef).child('papers').val();
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

        // retrieve passes for today
        this.votesRef.on('value', (snapshot) => {
            const today = new Date();
            const dateRef = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const passesObj = snapshot.child(dateRef).child('passes').val();
            const newPasses = [];

            for (var key in passesObj) {
                if (passesObj.hasOwnProperty(key)) {
                    var pass = {
                        id: key,
                        name: passesObj[key].name,
                        time: passesObj[key].time
                    }
                    newPasses.push(pass);
                }
            }
            this.setState({ passes: newPasses });
        })
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
                    passConfirm={this.passConfirm.bind(this)}
                    selectRandomly={this.selectRandomly.bind(this)}
                    sender={this.state.sender}
                    password={this.state.password}
                    typedSender={this.typedSender.bind(this)}
                    typedPassword={this.typedPassword.bind(this)}
                    storeClickedInPickedList={this.storeClickedInPickedList.bind(this)} />
                <Results votes={this.state.votes}
                    passes={this.state.passes}
                    delVoteBtnClicked={this.delVoteBtnClicked.bind(this)}
                    delPassBtnClicked={this.delPassBtnClicked.bind(this)}
                    showVoteBtnClicked={this.showVoteBtnClicked.bind(this)}
                    criteria={this.criteria}
                    HoursMinutesComparer={this.HoursMinutesComparer.bind(this)}
                    revealBtnClicked={this.revealBtnClicked.bind(this)}
                    reveal={this.state.reveal} />
            </div>
        );
    }
}

export default App;