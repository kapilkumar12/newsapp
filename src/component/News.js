import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    // console.log("Hello I am a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    // console.log("cmd");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=96a51c7b24d54399a3e9630eae8eb882&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }
  handlePrevClick = async () => {
    // console.log("pre");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&category=${
      this.props.category
    }&apiKey=96a51c7b24d54399a3e9630eae8eb882&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    // console.log("next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=96a51c7b24d54399a3e9630eae8eb882&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();
      //   console.log(parseData);

      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false,
      });
    }
  };
  render() {
    // console.log("render");
    return (
      <div className="container my-3 ">
        <h2 className="text-center">Top News Headlines</h2>
        {this.state.loading && <Spinner />}
        {/* <Spinner /> */}
        <div className="row my-3">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            style={{ padding: "6px" }}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            style={{ padding: "6px" }}
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
