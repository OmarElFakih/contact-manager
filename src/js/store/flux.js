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
			}
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
					let response = await fetch(`${store.baseURL}`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(user)
					});
				} catch (error) {
					console.log(error);
				}
			},

			SetNewContactProperty: (key, value) => {
				const store = getStore();

				setStore({ newContact: { ...store.newContact, [key]: value } });
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
			}
		}
	};
};

export default getState;
