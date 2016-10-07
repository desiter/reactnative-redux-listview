import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    welcome: {
        fontSize: 17,
        marginTop: 25,
        marginBottom: 10,
        textAlign: 'center'
    },
    error: {
        position: 'absolute',
        backgroundColor: 'red',
        color: '#fff',
        bottom: 0,
        left: 0,
        right: 0
    },
    searchContainer: {
        position: 'absolute',
        top: 20,
        left: 5,
        right: 5,
        height: 40,
        padding: 10,
        backgroundColor: '#fff',
        zIndex:1,
    },
    searchExit: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    search: {
        position: 'absolute',
        left: 40,
        top: 10,
        right: 10,
        height: 20,
        fontSize: 17
    },
    currentLocation: {
        position: 'absolute',
        bottom: 50,
        right: 10,
        zIndex: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    list: {
        position: 'absolute',
        top: 60,
        left: 5,
        right: 5,
        bottom: 5,
        zIndex:2,
        backgroundColor: '#fff'
    },
    mapContainer: {
        flex: 2,
    },
    map: {
        backgroundColor: '#f00',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginHorizontal: 10,
    }

});

export default styles;
