const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: [],

			baseURL: "https://assets.breatheco.de/apis/fake/contact/",

			executeEffect: true,

			newContact: {
				full_name: "",
				email: "",
				agenda_slug: "OmarElFakih",
				address: "",
				phone: ""
			},

			isEditing: false
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()

			GetData: async username => {
				//obtener mis datos,
				const store = getStore();
				try {
					let response = await fetch(`${store.baseURL}agenda/${username}`);
					if (response.ok) {
						let data = await response.json();
						setStore({ contacts: data });
					} else {
						//crear usuario
					}
				} catch (error) {
					console.log(error);
				}
			},

			CreateUser: username => {},

			AddContact: async user => {
				const store = getStore();
				try {
					let response = await fetch(`${store.baseURL}${store.isEditing ? store.newContact.id : ""}`, {
						method: `${store.isEditing ? "PUT" : "POST"}`,
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							full_name: store.newContact.full_name,
							email: store.newContact.email,
							agenda_slug: store.newContact.agenda_slug,
							address: store.newContact.address,
							phone: store.newContact.phone
						})
					});
					getActions().GetData("OmarElFakih");
					getActions().ResetNewContact();
					console.log(store.contacts);
				} catch (error) {
					console.log(error);
				}
			},

			deleteContact: async id => {
				const store = getStore();
				let response = await fetch(`${store.baseURL}${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				});
				getActions().GetData("OmarElFakih");
			},

			SetNewContactProperty: (key, value) => {
				const store = getStore();

				setStore({ newContact: { ...store.newContact, [key]: value } });
			},

			setNewContactForUpdate: idToEdit => {
				const store = getStore();
				let contactToEdit = store.contacts.find(current => current.id == idToEdit);
				let newContactBlueprint = {
					full_name: contactToEdit.full_name,
					email: contactToEdit.email,
					agenda_slug: contactToEdit.agenda_slug,
					address: contactToEdit.address,
					phone: contactToEdit.phone,
					id: contactToEdit.id
				};

				setStore({ newContact: newContactBlueprint });
				getActions().setIsEditing(true);
			},

			ResetNewContact: () => {
				setStore({
					newContact: {
						full_name: "",
						email: "",
						agenda_slug: "OmarElFakih",
						address: "",
						phone: ""
					}
				});
				getActions().setIsEditing(false);
			},

			setExecuteEffect: value => {
				setStore({ executeEffect: value });
			},

			setIsEditing: value => {
				setStore({ isEditing: value });
			}
		}
	};
};

export default getState;
