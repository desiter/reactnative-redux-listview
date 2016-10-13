import React, { Component, PropTypes } from 'react';
import { Text, View, ListView, TextInput, TouchableWithoutFeedback } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { debounce, get, assign } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchList, getLocation, setLocation } from '../../actions';
import ListItem from '../ListItem';
import Details from '../Details';
import styles from './styles';

export class MapList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            items: [],
            activeItemId: null,
            error: null,
            dataSource,
            location: null,
        };
    }

    componentWillUpdate(nextProps) {
        if (nextProps.items !== this.state.items) {
            this.setState({
                items: nextProps.items,
                dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
            });
        }

        if (nextProps.error !== this.state.error) {
            this.setState({
                error: nextProps.error,
            });
        }

        if (nextProps.location !== this.state.location) {
            this.setState((prevState) => {
                this._fetchList();
                return {
                    ...prevState,
                    location: nextProps.location,
                };
            });
        }
    }

    componentDidMount() {
        this._getCurrentLocation();
    }

    _getCurrentLocation = () => {
        this.props.dispatch(getLocation());
    }

    _renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
        return (
            <View key={`SEP_${sectionId}_${rowId}`} style={styles.separator} />
        );
    }

    _renderRow = (rowData) => {
        return (
            <ListItem data={rowData} onPress={this._onItemPress} />
        );
    }

    _onItemPress = (item) => {
        this.setState({ activeItemId: item.id });
    }

    _onItemClose = () => {
        this.setState({ activeItemId: null });
    }

    _onRegionChange = (location) => {
        this.setState({ location });
        this.props.dispatch(setLocation(location));
    }

    _renderSearch() {
        return (
            <View style={styles.searchContainer}>
                {this.state.listMode ? (
                    <Icon name="arrow-back" style={styles.searchIcon} onPress={this._closeList} />
                ) : (
                    <Icon name="menu" style={styles.searchIcon} />
                )}
                <TextInput
                  ref="search"
                  placeholder="Search Coffee Shops"
                  style={styles.search}
                  onChangeText={this._onSearch}
                  onFocus={this._openList}
                    // onBlur={this._checkSearchFocus}
                  returnKeyType="search"
                  value={this.state.query}
                />
            </View>
        );
    }

    _renderMap() {
        return this.state.location ? (
            <View style={styles.mapContainer}>
                <MapView
                  region={this.state.location}
                  onRegionChange={this._onRegionChange}
                  style={styles.map}
                >
                    {this.state.items.map(this._renderMarker)}
                </MapView>
            </View>
        ) : null;
    }

    _renderMarker(rowData, idx) {
        const coordinate = {
            latitude: get(rowData, 'location.lat'),
            longitude: get(rowData, 'location.lng'),
        };
        const { location } = rowData;
        return (
            <MapView.Marker
              key={`map-marker-${idx}`}
              coordinate={coordinate}
              identified={rowData.id}
              title={rowData.name}
              description={`${location.address}, ${location.city}`}
            />
            // @todo use custom callout view
        );
    }

    _openList = () => {
        this.setState({ listMode: true });
    }

    _closeList = () => {
        this.setState({ listMode: false });
        this.refs.search.clear();
        dismissKeyboard();
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

    _renderDetails() {
        console.log('render details', this.state.detailsData);
        return this.state.activeItemId ? (
            <Details style={styles.details} itemId={this.state.activeItemId}
              onClose={this._onItemClose}
            />
        ) : null;
    }

    _onSearch = (query) => {
        this.setState({ query });
        this._fetchList();
    };

    _fetchList = debounce(() => {
        this.props.dispatch(fetchList(this.state.location, this.state.query));
    }, 300);

    render() {
        return (
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    {this._renderSearch()}
                    {this._renderMap()}
                    <View style={styles.currentLocation}>
                        <Icon name="location-searching"
                          onPress={this._getCurrentLocation}
                          size={20} color="#000"
                        />
                    </View>
                    {this._renderList()}
                    {this._renderDetails()}
                    {this._renderError()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

MapList.propTypes = {
    items: PropTypes.array,
    location: PropTypes.object,
    error: PropTypes.object,
    dispatch: PropTypes.func,
};

MapList.defaultProps = {
    items: [],
    error: null,
    location: null,
    dispatch() {},
};

function select(state) {
    return assign({}, state.MapList, { location: state.Location });
}

export default connect(select)(MapList);
