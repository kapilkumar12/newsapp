import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <>
      <div className="card">
        <span
          className="badge badge-light bg-danger rounded-pill position-absolute"
          style={{ right: "0" }}
        >
          {source}
        </span>
        <img
          className="card-img-top"
          src={
            !imageUrl
              ? "https://c.ndtvimg.com/2022-11/fobearo8_jos-buttler-afp_625x300_01_November_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675"
              : imageUrl
          }
          alt=" "
        />
        <div className="card-body">
          <h5 className="card-title">
            {title}

            <span className="sr-only"></span>
          </h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-primary bg-dark"
          >
            Read more
          </a>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
