import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { fetchList, getLocation } from '../actions';
import MapView from 'react-native-maps';
import { debounce, clone } from 'lodash';

const INITIAL_REGION = {
    latitude: 52.22977,
    longitude: 21.0117800,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
};

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
    search: {
        position: 'absolute',
        top: 20,
        left: 5,
        right: 5,
        height: 40,
        padding: 10,
        backgroundColor: '#fff',
        zIndex:1,
    },
    list: {
        position: 'absolute',
        top: 60,
        left: 5,
        right: 5,
        bottom: 5,
        zIndex:1,
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
    },
    listItem: {
        padding: 10
    },
    listItemText: {
        fontSize: 12
    }
});

export default class SimpleList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            items: [],
            error: null,
            dataSource,
            region: INITIAL_REGION,
            location: null
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.items !== this.state.items) {
            this.setState({
                items: nextProps.items,
                dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
            });
        }

        if (nextProps.error !== this.state.error) {
            this.setState({
                error: nextProps.error
            });
        }

        if (nextProps.location !== this.state.location) {
            this.setState(prevState => {
                prevState.location = nextProps.location;
                prevState.region.latitude = nextProps.location.latitude;
                prevState.region.longitude = nextProps.location.longitude;
                return prevState;
            });
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchList(this.state.region));
        this._getCurrentLocation();
    }

    _getCurrentLocation = () => {
        this.props.dispatch(getLocation());
    }

    _renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
        return (
            <View key={"SEP_" + sectionId + "_" + rowId}  style={styles.separator}/>
        );
    }

    _renderRow(rowData) {
        return (
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>{rowData.title}</Text>
            </View>
        );
    }

    _renderMarker(rowData, idx) {
        return (
            <MapView.Marker
                key={`map-marker-${idx}`}
                coordinate={rowData}
                title={rowData.title}
            />
        );
    }

    _checkSearchFocus = () => {
        //console.log('search focus', this.refs.search.isFocused());
        this.setState({ listMode: this.refs.search.isFocused() });
    }

    _renderError() {
        return this.state.error ? (
            <Text style={styles.error}>
                { this.state.error.toString() }
            </Text>
        ) : null;
    }

    _renderList() {
        return this.state.listMode ? (
            <ListView
                dataSource={this.state.dataSource}
                automaticallyAdjustContentInsets={false}
                enableEmptySections
                renderSeparator={this._renderSeparator}
                renderRow={this._renderRow}
                style={styles.list}
            />
        ) : null;
    }

    _onRegionChange = (region) => {
        this.setState({ region });
        this._fetchList();
    };

    _onSearch = (query) => {
        this.setState({ query });
        this._fetchList();
    };

    _fetchList = debounce(() => {
        this.props.dispatch(fetchList(this.state.region, this.state.query));
    }, 300);

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref="search"
                    placeholder="Search Coffee Shops"
                    style={styles.search}
                    onChangeText={this._onSearch}
                    onFocus={this._checkSearchFocus}
                    onBlur={this._checkSearchFocus}
                    returnKeyType="search"
                    value={this.state.query}
                />
                <View style={styles.mapContainer}>
                    <MapView
                        region={this.state.region}
                        onRegionChange={this._onRegionChange}
                        style={styles.map}
                    >
                        {this.state.items.map(this._renderMarker)}
                    </MapView>
                </View>
                {this._renderList()}
                {this._renderError()}
            </View>
        );
    }
}

SimpleList.propTypes = {
    items: PropTypes.array,
    error: PropTypes.object,
    dispatch: PropTypes.func
};

SimpleList.defaultProps = {
    items: [],
    error: null,
    location: null,
    dispatch() {}
};

function select(state) {
    return state.SimpleList;
}

export default connect(select)(SimpleList);
