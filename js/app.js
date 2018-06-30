/** @jsx React.DOM */
var content  = document.getElementById('content');
var title    = document.getElementById('title');
var form 	 = document.getElementById('collapseAdd');
var collapse = document.getElementById('collapseBox');

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
	getInitialState: function () {
		return {
			elemsCollapse:[
			{
				'title':'collapse1',
				'text':'Esto es un collapse'
			},
			{
				'title':'collapse2',
				'text':'Esto es un collapse'
			}
			]
		};
	},
	addElement: function (event) {
		event.preventDefault();
		var elementsAct = this.state.elemsCollapse;
		elementsAct.push({'title':this.refs.collapseName.state.value,'text':this.refs.collapseText.state.value});
		this.setState({
			elemsCollapse: elementsAct
		},this.componentDidMount());
	},
	componentDidMount: function () {
		React.renderComponent(Collapse({elements:this.state.elemsCollapse}),collapse);
	},
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
							className:'col-xl-4',
							children:[
								React.DOM.input({
									type:'text',
									className:'form-control',
									id:'text-collapse',
									placeholder:'Escribe el contenido',
									ref:'collapseText'
								}),
							]
						}),
						React.DOM.div({
							className:'col-xl-2 btnSend',
							children:[
								React.DOM.button({
									className:'btn btn-primary',
									children:'Enviar',
									onClick:this.addElement
								})
							]
						}),
					]
				})
	}
});


var Collapse = React.createClass({
	updateProperties: function(){
		this.props.elements.map(function(item){
			$('#item_' + item.title).attr({
				'data-toggle':'collapse',
				'data-target':'#' + item.title,
				'aria-expanded':'true',
				'aria-controls':item.title
			});
		})
	},
	componentDidMount: function () {
		this.updateProperties();
	},
	componentDidUpdate: function () {
		this.updateProperties();
	},
	generateCollapse: function(item){
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
									className:'btn btn-link',
									id:'item_' + item.title,
									type:'button',
									children:item.title
								})
							]
						})
					]
				}),
				React.DOM.div({
					id:item.title,
					className:'collapse show',
					children:[
						React.DOM.div({
							className:'card-body',
							children:item.text
						})
					]
				})
			]
		})
	},
	render: function(){
		return React.DOM.div({
					className:'accordion',
					id:'collapseGroup',
					children:this.props.elements.map(this.generateCollapse)
			   })
	}
})

React.renderComponent(FormCollapse(),form);


//var content = document.getElementById('content');
//React.renderComponent(<Input/>, content);
