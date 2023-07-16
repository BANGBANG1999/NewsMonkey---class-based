   import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, url, author, date, source } = this.props;

    const cardStyle = {
      height: '500px', // Set your desired height
      width: '100%', // Set your desired width
      position: 'relative', // Enable positioning context for the card
      // border: "0.0001px solid grey"
    };

    const buttonStyle = {
      position: 'absolute', // Position the button absolutely within the card
      bottom: '20px', // Adjust the vertical position as needed
      left: '20px', // Adjust the horizontal position as needed
    };

    return (
      <>
        <div className="card" style={cardStyle}>
        <div className="container" style={{display: "flex", justifyContent: "flex-end", margin:0, padding: 0, position: "absolute", right: 0}}>
          <span class="badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
          
          <img src={imageUrl} className="card-img-top" style={{ height: "230px" }} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a
              rel="noreferrer"
              href={url}
              target="_blank"
              className="btn btn-dark"
              style={buttonStyle}
            >
              Read more
            </a>
          </div>
        </div>
      </>
    );
  }
}


//Alternate solution:

// import React, { Component } from 'react'

// export default class NewsItem extends Component {
//   render() {
//     let {title, description, imageUrl, url} = this.props;
//     return (
//       <div>
//         <div className="card" >
//           <img src={imageUrl} className="card-img-top" alt="..." />
//             <div className="card-body">
//               <h5 className="card-title">{title}</h5>
//               <p className="card-text">{description}...</p>
//               <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark">Read more</a>
//             </div>
//         </div>
//       </div>
//     )
//   }
// }







