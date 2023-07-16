import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { render } from "react-dom";

export default class News extends Component {

  static defaultProps = {
    country: 'us',
    category: 'sports'
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props)
    // console.log("Hello from news component constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(20)
    let { country, category, pageSize, apiKey } = this.props
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(40)
    let parsedData = await data.json();
    // this.props.setProgress(60)
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults

    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();

  }

  // handleNextPage = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews()
  // }

  // handlePrevPage = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews()
  // }

 fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let { country, category, pageSize } = this.props
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=acab13fa6cc7497093b38b1ec680106a&page=${this.state.page}&pageSize=${pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults

    })
 }

  render() {
    return (
      <>
        <h1 className='text-center' style={{ "margin": "30px" }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
  
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // hasMore={this.state.articles.length !== this.state.totalResults}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
          
        
        >

          <div className="container">
          <div className="row my-5">
            {this.state.articles.map((element) => {
              return <div className="col-md-4 my-4" key={element.url}>
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
}
