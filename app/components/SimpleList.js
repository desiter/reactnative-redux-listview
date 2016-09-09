import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import fetchList from '../actions/fetchList';
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
        flex: 1,
        backgroundColor: 'red',
        color: '#fff',
        padding: 10
    },
    listContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex:1,
    },
    search: {
        height: 40,
        padding: 10,
        margin: 5,
        marginBottom: 0,
        backgroundColor: '#fff'
    },
    list: {
        flex: 1,
        margin: 5,
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
            region: INITIAL_REGION
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
                error: nextProps.error,
                items: []
            });
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchList(this.state.region));
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

    _renderList() {
        if (this.state.error) {
            console.log(this.state.error);
            return (
                <Text style={styles.error}>
                    { this.state.error.toString() }
                </Text>
            );
        }

        const listView = this.state.listMode ? (
            <ListView
                dataSource={this.state.dataSource}
                automaticallyAdjustContentInsets={false}
                enableEmptySections
                renderSeparator={this._renderSeparator}
                renderRow={this._renderRow}
                style={styles.list}
            />
        ) : null;

        return (
            <View style={styles.listContainer}>
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
                {listView}
            </View>
        );
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
                <Text style={styles.welcome}>
                    Welcome to SimpleListApp!
                </Text>
                {this._renderList()}
                <View style={styles.mapContainer}>
                    <MapView
                        region={this.state.region}
                        onRegionChange={this._onRegionChange}
                        style={styles.map}
                    >
                        {this.state.items.map(this._renderMarker)}
                    </MapView>
                </View>
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
    dispatch() {}
};

function select(state) {
    return {
        items: state.SimpleList.items,
        error: state.SimpleList.error
    };
}

export default connect(select)(SimpleList);
