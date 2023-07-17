import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
// import { render } from "react-dom";

const News = (props) => {

 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // const [progress, setProgress] = useState(0)

  const updateNews = async () => {
    props.setProgress(20)
    let { country, category, pageSize, apiKey } = props
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(40)
    let parsedData = await data.json();
    // this.props.setProgress(60)
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
  
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews()
    //eslint-disable-next-line
  }, [])

  // handleNextPage = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews()
  // }

  // handlePrevPage = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews()
  // }

 const fetchMoreData = async () => {
    
    let { country, category, pageSize } = props
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=acab13fa6cc7497093b38b1ec680106a&page=${page+1}&pageSize=${pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
 }

    return (
      <>

        <h1 className='text-center' style={{ "margin": "30px", marginTop: "90px" }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
  
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          // hasMore={this.state.articles.length !== this.state.totalResults}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
          
        
        >

          <div className="container">
          <div className="row my-5">
            {articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 35)+"..." : ""} description={element.description ? element.description.slice(0, 85) : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sed delectus distinctio temporibus mollitia omnis sint laboriosam beatae quam autem."} imageUrl={element.urlToImage ? element.urlToImage : "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/360500/360507.6.jpg"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        

        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevPage}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next &rarr;</button>
        </div> */}

</>
    )
}

News.defaultProps = {
  country: 'us',
  category: 'sports'
}
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News