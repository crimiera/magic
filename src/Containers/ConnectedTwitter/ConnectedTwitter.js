import React, {Component} from 'react';
import { fetchLatest, fetchMore } from '../../api/twitter';
import { refetch } from '../../common/helpers';
import TweetList from '../../Components/TweetList';
import Tweet from '../../Components/Tweet';

class ConnectedTwitter extends Component{
    state = {
        tweets:[],
        lastTweetId:0,
        autoUpdate:true,
    }

    async componentDidMount(){
        const tweets = await refetch( fetchLatest ).catch( error=>{
            this.setState({error});
        });
        if( tweets && tweets.length>0 ){
            this.setState({tweets, lastTweetId:tweets[0].id});
        }
        this.startTimer();
    }

    render(){
        const {error} = this.state;
        return (
            <div>
                {error && this.renderButton()}
                <TweetList>
                    {this.renderTweets()}
                </TweetList>
            </div> 
        )
    }

    renderButton = () => {
        const{ autoUpdate } = this.state;
        const start =  "Start";
        const stop =  "Stop";
        const buttonText = autoUpdate ? stop : start;
        return <button onClick={this.handleClick}>{buttonText}</button>
    }

    handleClick = () => {
        const { autoUpdate } = this.state;
        autoUpdate ? this.stopTimer() : this.startTimer();
    }

    renderTweets = () => {
        const{ tweets } = this.state;
        return tweets.map( tweet =>  <Tweet key={tweet.id} {...tweet} />)
    }

    startTimer = () => {
        const INTERVAL = 5000;
        this.setState({error:null});
        this.timer = setInterval(() => {this.fetchMoreTweets()}, INTERVAL);
        this.setState({autoUpdate:true});
    }

    stopTimer = () => { 
        this.setState({autoUpdate:false});
        window.clearInterval(this.timer);
    }
    
    fetchMoreTweets = async () => {
        const { lastTweetId, tweets: currentTweets } = this.state;
        const payload = { after:lastTweetId };
        const tweets = await refetch(fetchMore, payload).catch( error=>{
            this.setState({error});
        });

        if(tweets && tweets.length>0){
            this.setState({tweets:[...tweets,...currentTweets ], lastTweetId:tweets[0].id})
        }
    }
}

export default ConnectedTwitter;