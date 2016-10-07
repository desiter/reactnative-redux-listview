import React, { Component, PropTypes } from 'react';
import { Text, View, ListView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { fetchList, getLocation } from '../../actions';
import MapView from 'react-native-maps';
import { debounce, clone, get } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from '../ListItem';
import styles from './styles.js';

const INITIAL_REGION = {
    latitude: 52.22977,
    longitude: 21.0117800,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
};

export default class MapList extends Component {
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
                this.props.dispatch(fetchList(this.state.region));
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
            <ListItem data={rowData} />
        );
    }

    _renderMarker(rowData, idx) {
        const coordinate = {
            latitude: get(rowData, 'location.lat'),
            longitude: get(rowData, 'location.lng')
        };
        return (
            <MapView.Marker
                key={`map-marker-${idx}`}
                coordinate={coordinate}
                title={rowData.name}
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
                <View style={styles.searchContainer}>
                    <Icon name="arrow-back"
                        onPress={() => this.refs.search.blur() }
                        style={styles.searchExit} size={20} color="#000" />
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
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        region={this.state.region}
                        onRegionChange={this._onRegionChange}
                        style={styles.map}
                    >
                        {this.state.items.map(this._renderMarker)}
                    </MapView>
                </View>
                <View style={styles.currentLocation}>
                    <Icon name="location-searching"
                        onPress={this._getCurrentLocation}
                        size={20} color="#000" />
                </View>

                {this._renderList()}
                {this._renderError()}
            </View>
        );
    }
}

MapList.propTypes = {
    items: PropTypes.array,
    error: PropTypes.object,
    dispatch: PropTypes.func
};

MapList.defaultProps = {
    items: [],
    error: null,
    location: null,
    dispatch() {}
};

function select(state) {
    return state.MapList;
}

export default connect(select)(MapList);
