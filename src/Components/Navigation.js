import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import Loading from 'react-loading';


class Navigation extends Component {

	componentDidMount() {
    this.props.fetchCat();
  }


  render(){
  	const links = this.props.catList;
  	const { isLoading, hasErrored } = this.props;

		return (
			<header className="app-header">
				<h1 className="app-title">Readable</h1>

					{ isLoading === true
						? <Loading type="spin" className="loader" />
						:
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
					}
	     </header>
			)
		}
	}

function mapStateToProps ({ isLoading, hasErrored, catList }) {
  return {
    isLoading,
    hasErrored,
    catList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCat: (data) => dispatch(fetchCategories(data))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
