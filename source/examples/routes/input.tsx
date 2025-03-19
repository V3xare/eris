import React, { useMemo } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Icons } from "../../components/Icons";
import { Number } from "../../components/Number";

export const InputRoute = ( props ) => {

	return (
		<Card borderless padding={ 0 }>

			<Card>
				<Divider>Input</Divider>	
				<Input onChange={( e ) => console.log( e.value ) }>{ "Hello World" }</Input>					
				<Divider>Span</Divider>	
				<Input span onChange={( e ) => console.log( e.value ) }>{ "Hello World( span )" }</Input>	
				<Divider>Notice/Alert</Divider>				
				<Input onChange={( e ) => console.log( e.value ) } alert={ true } notice={[
					(<div>Name length can't be lower than 3</div>),
					(<div>Name length can't be more than 255</div>)
				]}>{ "Hello World" }</Input>		
				<Divider>Conditions</Divider>			
				<Input onChange={( e ) => console.log( e.value ) } conditions={[
					{ condition: /^([a-zA-Z]){0,}$/g, desc: "Name must contain only a-z characters" },
					{ condition: /^(.){3,255}$/g, desc: "Name must be between 3 and 255 characters length" }
				]}>{ "Hello World" }</Input>
			</Card>

			<Card>
				<Divider>Select</Divider>	

				<Select value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
						{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
						{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
						{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
						{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
						{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
				]}/>

				<Divider>Select Span</Divider>	

				<Select span value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
						{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
						{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
						{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
						{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
						{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
				]}/>

				<Divider>Select Stretch</Divider>	

				<Select value={ "title277" } stretch onSelect={( v ) => console.log( v ) } list={[
						{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
						{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
						{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
						{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
						{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
				]}/>

			</Card>

			<Card>
				<Divider>Number</Divider>	

				<Number value={ 67 } min={ 0 } max={ 100 } step={ 5 } onChange={( e ) => console.log( e ) }/>

			</Card>

		</Card>
	);
};