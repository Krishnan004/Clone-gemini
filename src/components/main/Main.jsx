import React from 'react'
import MainDesign from '../design/MainDesign';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Main = () => {
    return (
        <div className="" >
            <MainDesign header={Header} content={Content} footer={Footer} />
        </div>
    )
}

export default Main
