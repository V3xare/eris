import React, { useMemo } from "react";

import { Card } from "../../components/Card";
import { Row } from "../../components/Row";
import { Divider } from "../../components/Divider";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Icons } from "../../components/Icons";
import { Number } from "../../components/Number";

export const InputRoute = ( props ) => {

	return (
		<div>

			<Card header={ "Input" }>

				<Card>
					<Row>{ "Simple" }</Row>
					<Row>
						<Input onChange={( e ) => console.log( e.value ) }>{ "Hello World" }</Input>	
					</Row>									
				</Card>

				<Card>
					<Row>{ "Span" }</Row>
					<Row>
						<Input span onChange={( e ) => console.log( e.value ) }>{ "Hello World( span )" }</Input>	
					</Row>
				</Card>				
				
				<Card>
					<Row>{ "Notice/Alert" }</Row>
					<Row>
						<Input onChange={( e ) => console.log( e.value ) } alert={ true } notice={[
							(<div>Name length can't be lower than 3</div>),
							(<div>Name length can't be more than 255</div>)
						]}>
							{ "Hello World" }
						</Input>	
					</Row>
				</Card>

				<Card>
					<Row>{ "Conditions" }</Row>
					<Row>
						<Input onChange={( e ) => console.log( e.value ) } conditions={[
							{ condition: /^([a-zA-Z]){0,}$/g, desc: "Name must contain only a-z characters" },
							{ condition: /^(.){3,255}$/g, desc: "Name must be between 3 and 255 characters length" }
						]}>
							{ "Hello World" }
						</Input>
					</Row>									
				</Card>

			</Card>

			<Card header={ "Select" }>

				<Card>
					<Row>{ "Simple" }</Row>
					<Row>
						<Select value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
							{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
							{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
							{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
							{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
							{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
						]}/>
					</Row>									
				</Card>						
				
				<Card>
					<Row>{ "Headerless" }</Row>
					<Row>
						<Select headerless value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
							{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
							{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
							{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
							{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
							{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
						]}/>
					</Row>									
				</Card>						
				
				<Card>
					<Row>{ "Headerless Row" }</Row>
					<Row>
						<Select headerless row value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
							{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
							{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
							{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
							{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
							{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
						]}/>
					</Row>									
				</Card>				

				<Card>
					<Row>{ "Headerless Row Stretch" }</Row>
					<Row>
						<Select stretch headerless row value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
							{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
							{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
							{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
							{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
							{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
						]}/>
					</Row>									
				</Card>					
				
				<Card>
					<Row>{ "Headerless Row Stretch, Length, max-width: 400px" }</Row>
					<Row>
						<Select stretch headerless row style={{ maxWidth: 400 }}  value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
							{ icon: <Icons.blog/>, value: "title1", title: "title 1", length: "" },
							{ icon: <Icons.image/>, value: "title2", title: "title 27777777777", length: "" },
							{ icon: <Icons.camera/>, value: "title3", title: "title 3", length: "24" },
							{ icon: <Icons.dice/>, value: "title4", title: "title 4", length: "" },
							{ icon: <Icons.podcast/>, value: "title5", title: "title 5", length: "4" },
							{ icon: <Icons.share/>, value: "title6", title: "title 6", length: "" },
							{ icon: <Icons.accessibility/>, value: "title7", title: "title 7", length: "" },
							{ icon: <Icons.shield/>, value: "title8", title: "title 8", length: "" },
						]}/>
					</Row>									
				</Card>				

				<Card>
					<Row>{ "Span" }</Row>
					<Row>
						<Select span value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
							{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
							{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
							{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
							{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
							{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
						]}/>
					</Row>									
				</Card>							
				
				<Card>
					<Row>{ "Stretch" }</Row>
					<Row>
						<Select value={ "title277" } stretch onSelect={( v ) => console.log( v ) } list={[
							{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
							{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
							{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
							{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
							{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
						]}/>
					</Row>									
				</Card>				

			</Card>

			<Card header={ "Numbers" }>

				<Card>
					<Row>{ "Simple" }</Row>
					<Row>
						<Number value={ 67 } min={ 0 } max={ 100 } step={ 5 } onChange={( e ) => console.log( e ) }/>
					</Row>
				</Card>			

			</Card>

		</div>
	);
};