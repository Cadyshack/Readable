import React, { Component } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { navigationOperations } from '../modules/navigation';
import Loading from 'react-loading';
import Menu from 'react-icons/lib/md/menu';
import './Navigation.css';



class Navigation extends Component {
	state = {
		mobileNavOpen: false
	}
	componentDidMount() {
    this.props.fetchCat();
  }
  openNav = () => {
  	this.setState({ mobileNavOpen: true });
  }
  closeNav = () => {
  	this.setState({ mobileNavOpen: false });
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
				<div className="navbar-fixed">
		      <nav className="menu blue-grey darken-4">
		      	<div className="container nav-wrapper">
		      		<Link to="/"><span className="brand-logo">Readable</span></Link>
		      		<a className="sidenav-trigger" onClick={ this.openNav }><Menu size={30} /></a>
		      		<ul className="nav-links hide-on-med-and-down">
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
		      	</div>
		      </nav>
		      <div
		      	onClick={ this.closeNav }
		      	className={this.state.mobileNavOpen ?
		      		'mobile-nav open blue-grey darken-4'
		      		:
		      		'mobile-nav close blue-grey darken-4'
		      		} >
		      		<span className="closebtn" >&times;</span>
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
	      	</div>
		     </div>
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
