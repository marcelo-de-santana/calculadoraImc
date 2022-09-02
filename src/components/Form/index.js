import React, {useState} from "react";
import {
    FlatList,
    Pressable,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Vibration
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(props){

    //ESTADOS DE CADA ITEM
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [imc, setImc] = useState(null);
    const [TextButton, setTextButton] = useState("Calcular");
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

function imcCalculator(){
    let heightFormat = height.replace(",",".");
    let weightFormat = weight.replace(",",".");
    let totalImc = ((weightFormat/(heightFormat**2)).toFixed(2));
    setImcList((arr) => [...arr, {id: new Date().getTime(), imc:totalImc}]);
    setImc(totalImc);
}

function verificationImc(){
    if(imc == null){
        Vibration.vibrate();
        setErrorMessage("Campo obrigatório*")
    }
};

function validationImc(){
    console.log(imcList);
    if(height != null && weight != null){
        imcCalculator();
        setHeight(null);
        setWeight(null);
        setMessageImc("Seu IMC é igual: ");
        setTextButton("Calcular Novamente");
        setErrorMessage(null);
    }else{
    //Após a reinserção dos dados
    verificationImc();
    setImc(null);
    setTextButton("Calcular");
    setMessageImc("Preencha o peso e altura");  
    }
}

    return(
        <View style={styles.formContext}>
            {imc == null ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex. 1.75"
                        keyboardType="numeric"/>
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput style={styles.input}
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="Ex. 86.300"
                        keyboardType="numeric"/>
                    <TouchableOpacity style={styles.buttonCalculator} onPress={() =>{validationImc()}}>
                        <Text style={styles.textButtonCalculator}>{TextButton}</Text>
                    </TouchableOpacity>
                </Pressable>
            :
                <View style={styles.exihibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} ResultImc={imc}/>
                    <TouchableOpacity style={styles.buttonCalculator} onPress={() =>{validationImc()}}>
                        <Text style={styles.textButtonCalculator}>{TextButton}</Text>
                    </TouchableOpacity>    
                </View>
            }
            <FlatList style={styles.listImcs} showsVerticalScrollIndicator={false}
                data={imcList.reverse()}
                renderItem={({item}) => {
                    return(
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>Resultado Imc = </Text>
                            {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item) => {item.id}}/>
        </View>
    );
}