class StorageClass{

	p_name: string;
	p_variables: {};

	constructor( name ){
		this.p_name = name;
		this.p_variables = {};
		this.load();
	};

	save(){
		let string = "";

		try{
			string = JSON.stringify( this.p_variables );
		}catch( e ){
			string = "";
		};

		window.localStorage.setItem( "state::" + this.p_name, string );
	};
	load(){
		let string = window.localStorage.getItem( "state::" + this.p_name );
		let object = {};

		try{
			object = JSON.parse( string || "" ) || {};
		}catch( e ){
			object = {};
		};

		this.p_variables = object;
	};

	get( name ){
		return this.p_variables[ name ];
	};
	set( name, value ){
		this.p_variables[ name ] = value;
		this.save();
	};

};
export const Storage = new StorageClass( "core" );