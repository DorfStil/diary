import './App.css';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Header from './components/Header/Header';
import Content from './layouts/Content/Content';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map((item) => ({
        ...item,
        date: new Date(item.date)
    }));
}

export default function App() {
    const [items, setItems] = useLocalStorage('data');
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSubmit = (item) => {
        if (item.id) {
            setItems([
                ...mapItems(items).map((index) => {
                    if (index.id === item.id) {
                        return {
                            ...item,
                            date: new Date(item.date)
                        };
                    } else {
                        return index;
                    }
                })
            ]);
        } else {
            setItems([
                ...mapItems(items),
                {
                    ...item,
                    date: new Date(item.date),
                    id:
            items.length > 0
                ? Math.max(...items.map((item) => item.id)) + 1
                : 1
                }
            ]);
        }
    };

    const handleDelete = (id) => {
        setItems([...items.filter(item => item.id !== id)]);
    };

    const handleClearForm = () => {
        setSelectedItem(null);
    };

    return (
        <UserContextProvider>
            <div className="app">
                <LeftPanel>
                    <Header />
                    <JournalAddButton clearForm={handleClearForm} />
                    <JournalList
                        items={mapItems(items)}
                        setItem={setSelectedItem}
                    ></JournalList>
                </LeftPanel>
                <Content>
                    <JournalForm
                        onSubmit={handleSubmit}
                        onDelete={handleDelete}
                        data={selectedItem}
                    />
                </Content>
            </div>
        </UserContextProvider>
    );
}
