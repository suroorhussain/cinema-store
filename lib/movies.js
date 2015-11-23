"use strict";

var moviesList = [
  {
    "id": 1,
    "title": "Premam",
    "year": "2015",
    "rating": "8.3/10",
    "director": "Alphonse Puthren",
    "summary": "Premam is a 2015 Indian Malayalam coming-of-age musical-romantic comedy drama film written, edited, and directed by Alphonse Putharen. It is a three-part portrait of the lead finding his true love.",
    "image": "premam.jpg"
  },
  {
    "id": 2,
    "title": "Amen",
    "year": "2013",
    "rating": "7.7/10",
    "director": "Lijo Jose Pellissery",
    "summary": "A new pastor (Indrajith) arrives in a village which is plagued by a variety of problems.",
    "image": "amen.jpg"
  },
  {
    "id": 3,
    "title": "Celluloid",
    "year": "2013",
    "rating": "7.7/10",
    "director": "Kamal",
    "summary": "Celluloid is a 2013 Malayalam film written and directed by Kamal, starring Prithviraj, Sreenivasan, Mamta Mohandas and Chandni in the lead roles.",
    "image": "celluloid.jpg"
  },
  {
    "id": 4,
    "title": "Ustad Hotel",
    "year": "2012",
    "rating": "8.3/10",
    "director": "Anwar Rasheed",
    "summary": "Feyze goes against his grandfather's wishes and is nearly disowned until they are able to look past their differences and form a tight bond.",
    "image": "ustad-hotel.jpg"
  },
  {
    "id": 5,
    "title": "Punyalan Agarbathis",
    "year": "2013",
    "rating": "6.9/10",
    "director": "Ranjith Sankar",
    "summary": "Joy Thakkolkaran, a young entrepreneur, makes agarbattis from elephant dung.",
    "image": "punyalan-agarbathis.jpg"
  },
  {
    "id": 6,
    "title": "Vellimoonga",
    "year": "2014",
    "rating": "7.4/10",
    "director": "Jibu Jacob",
    "summary": "A happy go lucky politician is smitten by a girl half his age and tries his luck winning her hand.",
    "image": "vellimoonga.jpg"
  }
];

var CinemaStoreHeader = React.createClass({
  render: function () {
    return (
      <div className="CinemaStoreHeader">
        <h2>Cinema Store App</h2>
      </div>
    );
  }
});

var CinemaStoreSearch = React.createClass({
  handleChange: function (event) {
    this.props.handleChange(event);
  },

  render: function () {
    return (
      <div className="CinemaStoreSearch">
        <input type="text"
               placeholder="Search by name, year or similar"
               value={this.props.filter}
               onChange={this.handleChange}/>
      </div>
    );
  }
});

var CinemaStoreMovie = React.createClass({
  classNames: function() {
    let secondaryClassNames = "col-lg-3 col-md-4 col-sm-6 col-xs-12";
    let primaryClassName = "CinemaStoreMovie";

    return [primaryClassName, secondaryClassNames].join(' ');
  },

  render: function () {
    let movie = this.props.movie;
    let imageFilePath = "static/images/" + movie.image;

    return (
      <div className={this.classNames()}>
        <h4>{movie.title}</h4>
        <img className="CinemaStoreMovie-thumbnail" src={imageFilePath}/>
        <p>{movie.summary}</p>
      </div>
    );
  }
});

var CinemaStoreGrid = React.createClass({
  collatedSearchText: function(movie) {
    return [movie.title, movie.year, movie.summary].join(' ').toLowerCase();
  },

  filteredMovies: function() {
    let filterText = this.props.filter.toLowerCase();

    //
    // The anonymous function passed to _.filter does not have access
    // to `this` of filteredMovies function context when it runs. So
    // if we tried to access this.collatedSearchText directly it
    // would be undefined, since `this` would then refer to the
    // anonymous functions context. But the variables defined here are
    // bound to the anonymous function automatically. So we store the
    // reference to the function in a local variable, which will work
    // fine within the anonymous function passed to _.filter.
    //
    // Wrong:
    // _.filter(collection, function(item) { this.collatedSearchText(item) }
    //
    // Correct:
    // _.filter(collection, function(item) { refToSearchTextFn(item) }
    //
    let refToSearchTextFn = this.collatedSearchText;

    return _.filter(this.props.movies, function(movie) {
      return _.contains(refToSearchTextFn(movie), filterText);
    });
  },

  moviesMarkup: function() {
    let filteredMovies = this.filteredMovies();

    return _.map(filteredMovies, function(movie) {
      return(
        <CinemaStoreMovie movie={movie} key={movie.id} />
      );
    });
  },

  gridRowsMarkup: function() {
    return _.map(_.chunk(this.moviesMarkup(), 4), function(row, idx) {
      let key = 'row-' + idx;

      return (
        <div className="row" key={key}>
          {row}
        </div>
      );
    });
  },

  render: function () {
    return (
      <div className="CinemaStoreGrid container">
        {this.gridRowsMarkup()}
      </div>
    );
  }
});

var CinemaStore = React.createClass({
  handleChange: function (event) {
    this.setState({filter: event.target.value});
  },

  getInitialState: function () {
    return {filter: 'Amen'};
  },

  render: function () {
    return (
      <div className="CinemaStore">
        <CinemaStoreHeader />
        <CinemaStoreSearch handleChange={this.handleChange} filter={this.state.filter}/>
        <CinemaStoreGrid movies={this.props.movies} filter={this.state.filter}/>
      </div>
    );
  }
});

ReactDOM.render(
  <CinemaStore movies={moviesList}/>,
  document.getElementById('content')
);
