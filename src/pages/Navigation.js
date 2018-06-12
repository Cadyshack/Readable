import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { navigationOperations } from '../modules/navigation';
import Loading from 'react-loading';


class Navigation extends Component {

	componentDidMount() {
    this.props.fetchCat();
  }

  render(){
  	const links = this.props.catList;
  	const { isLoading, hasErrored } = this.props;
  	if (hasErrored ){
  		return (
  			<header className="app-header">
	  			<h2>Can't seem to reach the server!</h2>
  			</header>
			)
  	}
  	if ( isLoading ) {
  		return (
  			<header className="app-header">
	  			<Loading type="spin" className="loader" />
  			</header>
  		)
  	}

		return (
			<header className="app-header">
				<h1 className="app-title">Readable</h1>
		      <nav className="menu">
			      <ul>
				      <li key="all">
		      			<NavLink activeClassName="selected" exact to="/">All</NavLink>
		      		</li>
		      		{
		      			links.map( (cat) => (
		      			<li key={cat.name}>
		      				<NavLink activeClassName="selected" to={`/${cat.path}`}>{cat.name}</NavLink>
	      				</li>
		      			))
		      		}
		      	</ul>
		      </nav>
	     </header>
			)
		}
	}

function mapStateToProps ({ categories }) {
  return {
    isLoading: categories.isLoading,
    hasErrored: categories.hasErrored,
    catList: categories.catList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCat: (data) => dispatch(navigationOperations.fetchCategories(data))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
