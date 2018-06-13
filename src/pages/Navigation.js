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
	      <nav className="menu">
	      	<div className="container">
      			<div className="flex-nav">
		      		<span className="sidenav-trigger" onClick={ this.openNav }><Menu size={30} /></span>
		      		<Link to="/" className="logo-link"><span className="brand-logo">Readable</span></Link>
		      		<ul className="nav-links">
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
	      </nav>
	      <div
	      	onClick={ this.closeNav }
	      	className={'mobile-nav ' + (this.state.mobileNavOpen ? 'open'	: 'close')} >
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
