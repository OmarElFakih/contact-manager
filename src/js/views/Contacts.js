import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

import { Context } from "../store/appContext";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		idToDelete: 0
	});

	const history = useHistory();

	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (store.executeEffect) {
			console.log("Entered UseEffect");
			actions.GetData("OmarElFakih");
			actions.setExecuteEffect(false);
			console.log("useEffect executed");
		}
	}, []);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add" onClick={() => actions.ResetNewContact()}>
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{/* <ContactCard onDelete={() => setState({ showModal: true })} />
						<ContactCard />
						<ContactCard />
						<ContactCard /> */}

						{store.contacts.map((current, index) => {
							return (
								<ContactCard
									onDelete={() => setState({ showModal: true, idToDelete: current.id })}
									onEdit={() => {
										actions.setNewContactForUpdate(current.id);
										history.push("/edit");
									}}
									history={current}
									key={index}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal
				show={state.showModal}
				onClose={() => setState({ ...state, showModal: false })}
				idToDelete={state.idToDelete}
			/>
		</div>
	);
};
