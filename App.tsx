import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './component/styled_Component';
import {useState} from 'react';

const App = () => {
  const [data, setData] = useState();
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState(null);

  const onpress_Handle = () => {
    if (data.trim() !== '') {
      setItems([...items, {id: Date.now(), title: data}]);
      setData('');
    } else {
      alert('Please Enter a Todo!');
    }
  };
  const onclick_Handle = id => {
    const new_Data = items.filter((val, index) => {
      return val.id !== id;
    });
    setItems(new_Data);
  };
  const edit_Btn_Handle = todo => {
    setEditedTodo(todo.id);
    setData(todo.title);
    setEdit(true);
  };

  const updateHandle = () => {
    if (data.trim() !== '') {
      const updatedTodos = items.map(elem => {
        if (elem.id === editedTodo) {
          return {...elem, title: data};
        }
        return elem;
      });
      setItems(updatedTodos);
      setEditedTodo(null);
      setData('');
      setEdit(false);
    } else {
      alert('Please Enter a Todo!');
    }
  };
  return (
    <View style={styles.conatiner}>
      <View style={styles.main_1}>
        <Text style={styles.text}>Hello User!</Text>
        <View style={styles.text_Veiw}>
          <TextInput
            style={styles.text_Input}
            value={data}
            placeholder="Enter a Todo!"
            onChangeText={e => setData(e)}
          />
          {edit ? (
            <TouchableOpacity
              onPress={() => updateHandle()}
              style={styles.touch}>
              <Text>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onpress_Handle} style={styles.touch}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.main_2}>
        <Text style={styles.main_2_Text}>Your To-Do List!</Text>
        <View style={{height: 350}}>
          <ScrollView>
            {items.map((val, index) => {
              return (
                <View key={index}>
                  <ScrollView>
                    <View style={styles.map}>
                      <Text style={styles.map_Text}>{val.title}</Text>
                      <View style={styles.button_View}>
                        <TouchableOpacity
                          onPress={() => onclick_Handle(val.id)}>
                          <Text style={styles.delete_Btn}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => edit_Btn_Handle(val)}>
                          <Text style={styles.edit_Btn}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default App;
