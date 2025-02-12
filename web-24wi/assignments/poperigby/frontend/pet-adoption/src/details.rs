use crate::api::{fetch_pet, QueryKeys, QueryValue};
use dioxus::prelude::*;
use dioxus_query::prelude::*;
use gloo_dialogs::confirm;

#[derive(PartialEq, Props)]
pub struct DetailsProps {
    id: usize,
}

pub fn Details(cx: Scope<DetailsProps>) -> Element {
    let pet = use_query(cx, || vec![QueryKeys::Pet(cx.props.id)], fetch_pet);

    let render = if let QueryResult::Ok(QueryValue::PetItem(p)) = pet.result().value() {
        log::info!("{:?}", p);
        cx.render(rsx! {
            div {
                class: "details",
                h1 {
                    p.name.clone()
                },
                h2 {
                    "{p.animal} — {p.breed} — {p.city}, {p.state}"
                },
                button {
                    class: "rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500",
                    onclick: |_| { 
                        confirm("Are you sure you want to adopt?");
                    },
                    "Adopt {p.name}"
                },
                p {
                    "{p.description}"
                }
            }
        })
    } else {
        cx.render(rsx! {
            h1 {
                "Uh, oh!"
            }
        })
    };

    render
}
