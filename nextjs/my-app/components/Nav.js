import React, {useEffect, useState} from 'react';
import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/inputtext';
import Router from "next/router";
import useSWR from 'swr';

export default function Nav() {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const {data, error} = useSWR(`/api/menu/primary`, fetcher);
    const [items, setItems] = useState([]);
    useEffect(async () => {
        const res = await fetch('/api/menu/primary');
        const data = await res.json();
        const n = [];
        if (data != null) {
            data.forEach((nav) => {

                n.push({
                    label: nav.title, command: () => {
                        Router.push(`${nav.url}`)
                    }
                })
                // items.push()
            })

            setItems(n);
        }
    }, [data])


    const start = <img alt="logo" src="showcase/images/logo.png"
                       onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                       height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text"/>;

    return (
        <div>
            <div className="card">
                {items.length > 0 && <Menubar model={items} start={start} end={end}/>}


            </div>
        </div>
    );
}

