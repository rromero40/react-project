/** @jsx React.DOM */
var content  = document.getElementById('content');
var title    = document.getElementById('title');
var form 	 = document.getElementById('collapseAdd');
var collapse = document.getElementById('collapseGroup');

var Titulo = React.createClass({
	render: function(){
		return(<h1>{this.props.name}</h1>);
	}
});

var Input = React.createClass({
	getInitialState: function () {
		return {
			name: ''
		};
	},
	saveName: function (event) {
		var name = this.refs.refName.getDOMNode().value;
		this.setState({
			name: name
		});
		React.renderComponent(Titulo({name:name}),title);
	},
	render: function(){
		return	React.DOM.div({
					className:'box-input',
					children:[
						React.DOM.input({
							id:'txtname',
							className:'input-name',
							placeholder:'Ingresar Nombre',
							type:'text',
							ref:'refName'
						}),
						React.DOM.input({
							id:'btnSave',
							className:'save-button',
							value:'Guardar',
							type:'button',
							ref:'refSave',
							onClick: this.saveName
						}),
						React.DOM.div({
			    			children:[
			    				React.DOM.span({
			    					children:'Mi nombre es  ' + this.state.name
			    				})	
			    			]
			    		})
					]
			    });
	}
});

var FormCollapse = React.createClass({
	render: function(){
		return  React.DOM.div({
					className:'row',
					children:[
						React.DOM.div({
							className:'col-xl-6 inputSend',
							children:[
								React.DOM.input({
									type:'text',
									className:'form-control',
									id:'name-collapse',
									placeholder:'Escribe el titulo del collapse',
									ref:'collapseName'
								}),
							]
						}),
						React.DOM.div({
							className:'col-xl-2 btnSend',
							children:[
								React.DOM.button({
									className:'btn btn-primary',
									children:'Enviar',
									onClick:this.generateCollapse
								})
							]
						}),
						React.renderComponent(Collapse({text:'Mi primer collapse', id:'collapse1'}),collapse)
					]
				})
	}
});


var Collapse = React.createClass({
	componentDidMount: function () {
		$('.btncollapse').attr({
			'data-toggle':'collapse',
			'data-target':'#' + this.props.id,
			'aria-expanded':'true',
			'aria-controls':this.props.id
		});
	},
	render: function(){
		return React.DOM.div({
			className:'card',
			children:[
				React.DOM.div({
					className:'card-header',
					id:'collapseOne',
					children:[
						React.DOM.h5({
							className:'mb-0',
							children:[
								React.DOM.button({
									className:'btn btn-link btncollapse',
									type:'button',
									children:'Collapse 1'
								})
							]
						})
					]
				}),
				React.DOM.div({
					id:this.props.id,
					className:'collapse show',
					children:[
						React.DOM.div({
							className:'card-body',
							children:this.props.text
						})
					]
				})
			]
		})
	}
})

React.renderComponent(<FormCollapse/>,form);


//var content = document.getElementById('content');
//React.renderComponent(<Input/>, content);
