import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){

    //ESTADOS DE CADA ITEM
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [imc, setImc] = useState(null);
    const [TextButton, setTextButton] = useState("Calcular");
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");

function imcCalculator(){
    return setImc((weight/(height**2)).toFixed(2));
}

function validationImc(){
    if(height != null && weight != null){
        imcCalculator();
        setHeight(null);
        setWeight(null);
        setMessageImc("Seu IMC é igual: ");
        setTextButton("Calcular Novamente");
        return
    }
    //Após a reinserção dos dados
    setHeight(null);
    setWeight(null);
    setImc(null);
    setTextButton("Calcular");
    setMessageImc("Preencha o peso e altura");    
}

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1.73"
                    keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 75.36"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.buttonCalculator}
                    onPress={() =>{
                        validationImc()
                    }}>
                        <Text style={styles.textButtonCalculator}>{TextButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} ResultImc={imc}/>    
        </View>
    );
}