import { StyleSheet } from 'react-native';

const padding = 20;
const height = 150;
const addressHeight = 60;
const addressPadding = 5;

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        height,
    },
    content: {
        // backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    photo: {
        marginLeft: 5,
        marginTop: 5,
        height: 100,
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        left: 10,
        color: '#fff',
        fontSize: 20,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
    },
    orderConfig: {
        position: 'absolute',
        padding: 10,
        top: 150,
        left: padding,
        right: padding,
        bottom: padding,
        zIndex: 5,
        backgroundColor: '#fff',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
});

export default styles;
