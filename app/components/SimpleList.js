import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import fetchList from '../actions/fetchList';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 17,
        marginTop: 25,
        marginBottom: 10,
        textAlign: 'center'
    },
    list: {
        backgroundColor: '#fff'
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
            dataSource
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.items !== this.state.items) {
            this.setState({
                items: nextProps.items,
                dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
            });
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchList());
    }

    _renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
        // var style = styles.rowSeparator;
        // if (adjacentRowHighlighted) {
        //     style = [style, styles.rowSeparatorHide];
        // }
        return (
          <View key={"SEP_" + sectionId + "_" + rowId}  style={styles.separator}/>
        );
    }

    _renderRow(rowData) {
        return (
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>{rowData}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to SimpleListApp!
                </Text>
                <ListView
                    dataSource={this.state.dataSource}
                    automaticallyAdjustContentInsets={false}
                    renderSeparator={this._renderSeparator}
                    renderRow={this._renderRow}
                    style={styles.list}
                />
            </View>
        );
    }
}

SimpleList.propTypes = {
    items: PropTypes.array,
    dispatch: PropTypes.func
};

SimpleList.defaultProps = {
    items: [],
    dispatch() {}
};

function select(state) {
    return {
        items: state.SimpleList.items
    };
}

export default connect(select)(SimpleList);