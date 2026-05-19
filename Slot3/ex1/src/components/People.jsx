function People() {
    const people = [
        {
            id: 1,
            name: 'Alice',
            age: 11

        },
        {
            id: 2,
            name: 'Bob',
            age: 12
        },
        {
            id: 3,
            name: 'Charlie',
            age: 35
        },
        {
            id: 4,
            name: 'David',
            age: 40
        },
        {
            id: 5,
            name: 'Eve',
            age: 28
        },
        {
            id: 6,
            name: 'Frank',
            age: 33
        },
        {
            id: 7,
            name: 'Grace',
            age: 27
        },
        {
            id: 8,
            name: 'Henry',
            age: 38
        },
        {
            id: 9,
            name: 'Ivy',
            age: 22
        },
        {
            id: 10,
            name: 'Jack',
            age: 31
        }
    ]

    const firstTeenager = people.find(person => person.age >= 13 && person.age <= 19);

    return (
        <div>
            <h1>People</h1>
            <ul>
                {people.map((person) => (
                    <li key={person.id}>{person.id}: {person.name} - {person.age}</li>
                ))}
            </ul>

            <h2>First Teenager</h2>
            {firstTeenager ? (
                <p>{firstTeenager.id}: {firstTeenager.name} - {firstTeenager.age}</p>
            ) : (
                <p>No result</p>
            )}
        </div>
    );
}

export default People;