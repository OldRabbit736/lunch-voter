import React from 'react';
import classes from './Results.module.css';
import Result from './Result/Result';
import Votes from './Votes/Votes';

const results = (props) => {

    // votes => [{id : '-Lf....', name : '궁예', picks : ['홍대개미', '닭갈비', '육개장']}, ... ]
    const votes = props.votes;
    // scoresObj => { 홍대개미 : [1, 0, 0], 매콤돈까스 : [0, 1, 0], ... }
    const scoresObj = {};
    // scoresArr => [[5, 1, 1, 0, '콩나물국밥'], [3, 1, 0, 0, '홍대개미'], ... ]
    const scoresArr = [];

    // scoresObj => { 홍대개미 : [1, 0, 0], 매콤돈까스 : [0, 1, 0], ... }    
    for (var key1 in votes) {
        if (votes.hasOwnProperty(key1)) {
            votes[key1].picks.map((pick, index) => {
                // make list of store names and count the picks
                // cautious! pick is string so use [pick] not .pick
                if (!scoresObj.hasOwnProperty(pick)) {
                    scoresObj[pick] = [0, 0, 0];
                    scoresObj[pick][index] += 1;
                } else {
                    scoresObj[pick][index] += 1;
                }
            });
        }
    }

    // scoresArr => [[5, 1, 1, 0, '콩나물국밥'], [3, 1, 0, 0, '홍대개미'], ... ]    
    for (var key2 in scoresObj) {
        if (scoresObj.hasOwnProperty(key2)) {

            // cautious! key2 is string so use [key2] not .key2   
            var score = [];
            var pick1 = scoresObj[key2][0];
            var pick2 = scoresObj[key2][1];
            var pick3 = scoresObj[key2][2];
            var total = pick1 * 3 + pick2 * 2 + pick3;

            score = [total, pick1, pick2, pick3, key2];
            scoresArr.push(score);
        }
    }

    const scoreComparator = (store1, store2) => {
        return store2[0] - store1[0];
    };

    scoresArr.sort(scoreComparator);

    const open = props.HoursMinutesComparer(props.criteria, new Date());

    const helpPop = () => {
        alert('리스트 정렬 로직\n1) 총점 높은 순\n2) 총점이 같은 것 끼리는 \'금은동\' 로직 적용\n3) \'금은동\'마저 같은 것 끼리는 먼저 등록된 순');
    }

    return (
        <div className={classes.Results}>
            <h2 className={classes.h2}>Results</h2>
            <span className={classes.help} onClick={helpPop}>?</span>
            {open !== -1 ?
                <div>
                    <Result store={scoresArr[0]} />
                    <Result store={scoresArr[1]} />
                    <Result store={scoresArr[2]} />
                    <Result store={scoresArr[3]} />
                </div>
                :
                <div>
                    <p>결과는 {props.criteria.getHours()}:{props.criteria.getMinutes()} 부터 표시됩니다.</p>
                    <button
                        className={classes.revealBtn}
                        onClick={props.revealBtnClicked}
                    >Reveal</button>
                </div>
            }

            <Votes votes={props.votes}
                delVoteBtnClicked={props.delVoteBtnClicked}
                showVoteBtnClicked={props.showVoteBtnClicked}
                open={open} />
        </div>
    )
}

export default results;