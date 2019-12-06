import React from 'react'
import { IndexWrapper,AddArea } from "../components/pagesStyle/home-style"
import ArticleList from "../components/ArticleList"
import TopicList from '../components/AdditionList/TopicList'
import TimeList from '../components/AdditionList/TimeList'
import HotList from '../components/AdditionList/HotList'
import Social from "../components/AdditionList/Social"


class Home extends React.Component{

    render() {
        return(
            <IndexWrapper>
                <ArticleList/>
                <AddArea>
                    <Social/>
                    <TopicList/>
                    <HotList/>
                    <TimeList/>
                </AddArea>
            </IndexWrapper>

        )
    }
}
export default Home;