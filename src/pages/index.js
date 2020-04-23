import React, { useCallback, useRef, useState } from 'react';

export default function pages() {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const addButtonref = useRef(null);

  const [list, setList] = useState([]);
  const [id, setId] = useState(null);
  const addNewItem = useCallback(() => {
    const title = titleRef?.current?.value || 'Sem Título';
    const desc = descRef?.current?.value || 'Sem Descrição';

    const newItem = {
      title,
      desc,
      id: id ?? list.length + 1,
    };

    !id
      ? setList((oldList) => [...oldList, newItem])
      : setList((oldList) =>
          oldList.map((item) => (item.id === id ? newItem : item))
        );

    titleRef.current.value = '';
    descRef.current.value = '';
    addButtonref.current.innerHTML = 'Add';
    setId(null);
  });

  const editItem = useCallback(({ title, desc, id }) => {
    addButtonref.current.innerHTML = 'Salvar';
    titleRef.current.value = title;
    descRef.current.value = desc;
    setId(id);
  });

  const removeItem = useCallback((id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(() => newList);
  });

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
        <span>Title</span>
        <input ref={titleRef} />

        <span>Description</span>
        <input ref={descRef} />

        <button ref={addButtonref} onClick={addNewItem}>
          Add
        </button>
      </div>
      <div>
        <ul
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          {list.map((item) => (
            <li
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                margin: '30px 0',
                border: '1px solid #222',
                width: '30%',
                borderRadius: '5px',
                boxShadow: '0 0 14px 0 #999',
                padding: '20px',
              }}
            >
              <span>
                <strong>Title:</strong> {item.title}
              </span>
              <span>
                <strong>Description:</strong> {item.desc}
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '20px',
                  justifyContent: 'space-between',
                }}
              >
                <button onClick={() => editItem(item)}>editar</button>
                <button onClick={() => removeItem(item.id)}>remover</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
