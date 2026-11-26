import React, { useState, useMemo, useCallback, memo } from "react";

const ChildButton = memo(function ChildButton({ onClick, label }) {
    console.log(`  [ChildButton] render: "${label}"`);
    return <button onClick={onClick}>{label}</button>;
});

export function Counter() {
    const [count, setCount] = useState(0);
    const [other, setOther] = useState(0);

    console.log("[Counter] render, count =", count);

    const handleClick = useCallback(() => {
        console.log("  [Counter] handleClick вызван");
        setOther((prev) => prev + 1);
    }, []);

    return (
        <section style={{ marginBottom: 32 }}>
            <p>Счётчик: {count}</p>
            <p>Клики по ChildButton: {other}</p>

            <button onClick={() => setCount((c) => c + 1)}>Увеличить счётчик</button>{" "}
            <ChildButton onClick={handleClick} label="Нажми меня" />
        </section>
    );
}

const INITIAL_USERS = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Alina" },
    { id: 5, name: "David" },
];

const NAMES_TO_ADD = ["Eve", "Frank", "Grace", "Alex", "Heidi", "Ivan"];

const UserList = memo(function UserList({ users }) {
    console.log("  [UserList] render, элементов:", users.length);
    return (
        <ul>
            {users.map((u) => (
                <li key={u.id}>{u.name}</li>
            ))}
        </ul>
    );
});

const AddButton = memo(function AddButton({ onAdd }) {
    console.log("  [AddButton] render");
    return <button onClick={onAdd}>Добавить пользователя</button>;
});

export function FilteredList() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [query, setQuery] = useState("");
    const [theme, setTheme] = useState(false);

    console.log("[FilteredList] render, query =", JSON.stringify(query));

    const filteredUsers = useMemo(() => {
        console.log("  [useMemo] фильтрация пересчитана");
        const q = query.trim().toLowerCase();
        return users.filter((u) => u.name.toLowerCase().includes(q));
    }, [users, query]);

    const handleAddUser = useCallback(() => {
        console.log("  [useCallback] handleAddUser вызван");
        setUsers((prev) => {
            const nextId = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
            const name = NAMES_TO_ADD[(nextId - 1) % NAMES_TO_ADD.length] + nextId;
            return [...prev, { id: nextId, name }];
        });
    }, []);

    return (
        <section
            style={{
                padding: 16,
                background: theme ? "#222" : "#f5f5f5",
                color: theme ? "#fff" : "#000",
            }}
        >
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Фильтр по имени"
            />{" "}
            <AddButton onAdd={handleAddUser} />{" "}
            <button onClick={() => setTheme((t) => !t)}>Сменить тему</button>

            <UserList users={filteredUsers} />


        </section>
    );
}