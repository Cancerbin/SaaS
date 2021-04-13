import React from 'react';
import { connect } from 'umi';
import { Modal, Tabs, Button } from 'antd';
import { PlusCircleOutlined, DeliveredProcedureOutlined, DeleteOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import BaseInfo from './Modal/baseInfo';
import Authoriza from './Modal/Authoriza';
import RoleMember from './Modal/roleMember';

const { TabPane } = Tabs;
const TabList = [
  {
    title: '基础信息',
    key: 'baseInfo'
  },
  {
    title: '授权信息',
    key: 'authoriza'
  },
  {
    title: '角色成员',
    key: 'roleMember'
  },
]

class UpdateModal extends React.Component {
  formRef = React.createRef();
  baseInfoRef = React.createRef();

  state = {
    tabKey: "baseInfo",
    updateModalVisible: false,
    authorizaList: []
  }

  componentDidMount() {
    const { detail } = this.props;
    this.setState({
      updateModalVisible: true
    }, () => {
      if (detail.id) {
        this.queryCharacterAuthoriza();
      }
    })
  }

  componentDidUpdate(preProps) {
    if (preProps.detail.id !== this.props.detail.id) {
      console.log(this.props.detail)
    }
    // if ((preProps.detail.id !== this.props.detail.id) && this.props.detail.id) {
    //   console.log(this.props.detail)
    //   this.queryCharacterAuthoriza();
    // }
  }

  // 获取授权信息
  queryCharacterAuthoriza = () => {
    const { dispatch, detail } = this.props;
    dispatch({
      type: 'character/queryCharacterAuthoriza',
      payload: {
        id: detail.id
      }
    }).then(res => {
      if (res && res.code === 0) {
        this.setState({
          authorizaList: res.data.roleMenuTreeList
        })
      }
    })
  }

  add = () => {
    const { bindEvent } = this.props;
    this.setState({
      tabKey: "baseInfo"
    }, () => {
      this.baseInfoRef.current.setFieldsValue({
        code: undefined,
        name: undefined,
        describe: undefined
      });
      bindEvent('add');
    })

  }

  submitForm = () => {
    const { bindEvent } = this.props;
    const { tabKey } = this.state;
    this.baseInfoRef.current.validateFields()
      .then(values => {
        bindEvent('save', tabKey, values)
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteEvent = () => {
    const { bindEvent, detail } = this.props;
    Modal.confirm({
      centered: true,
      content: `确定定要删除角色信息【${detail.code}】吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        bindEvent('delete')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 切换tab
  changeTab = (tab) => {
    this.setState({
      tabKey: tab
    })
  }

  changeItem = (type, e, field, row) => {
    const checkedValue = e.target.checked ? 1 : 0;
    const { authorizaList } = this.state;
    const newlist = [...authorizaList];
    const fieldArray = ["viewResource", "addResource", "editResource", "deleteResource", "auditResource", "inputResource", "exportResource", "printResource", "setResource", "otherResource", "invalidResource"];

    if (type === 'all') {
      const TraverseChild = (arr) => {
        arr.forEach((item, index) => {
          arr[index].status = checkedValue;
          fieldArray.forEach(ifield => {
            if (arr[index][ifield].status !== 2 && arr[index][ifield].status !== checkedValue) {
              arr[index][ifield].status = checkedValue;
            }
          })
          if (arr[index].children) {
            TraverseChild(arr[index].children);
          }
        })
      }
      TraverseChild(newlist);
    } else {
      let parentPath;
      const FindParent = (array, id, cache) => {
        array.forEach(item => {
          const tempArray = [...cache];
          if (item.id === id) {
            tempArray.push(item.id)
            parentPath = tempArray;
          } else {
            if (item.children) {
              tempArray.push(item.id)
              FindParent(item.children, id, tempArray)
            }
          }
        })
      }
      FindParent(newlist, row.id, []);

      let updateObject;
      const FindIndex = (array, num) => {
        let index;
        let tempArray;
        if (num === 0) {
          index = array.findIndex(item => item.id === parentPath[num]);
          tempArray = array[index];
        } else {
          index = array.children.findIndex(item => item.id === parentPath[num]);
          tempArray = array.children[index];
        }

        if (num === parentPath.length - 1) {
          updateObject = num === 0 ? array[index] : array.children[index];
        } else {
          FindIndex(tempArray, num + 1);
        }
      }
      FindIndex(newlist, 0);

      const TraverseChild = (obj) => {
        if (obj.children) {
          obj.children.forEach((item, index) => {
            if (field === 'id') {
              obj.children[index].status = checkedValue;
              fieldArray.forEach(ifield => {
                if (obj.children[index][ifield].status !== 2) {
                  obj.children[index][ifield].status = checkedValue;
                }
              })
            } else {
              if (obj.children[index][field].status !== 2) {
                obj.children[index][field].status = checkedValue;
              }
            }
            TraverseChild(item);
          })
        }
      }
      if (field === 'id') {
        updateObject.status = checkedValue;
        fieldArray.forEach(item => {
          if (updateObject[item].status !== 2) {
            updateObject[item].status = checkedValue;
          }
        })
      } else {
        updateObject[field].status = checkedValue;
      }

      TraverseChild(updateObject);
    }

    this.setState({
      authorizaList: newlist
    })
  }

  render() {
    const { type = 'add', detail = {}, loadingSave = false, loadingDelete = false, bindEvent } = this.props;
    const { updateModalVisible, tabKey, authorizaList } = this.state;
    return (
      <Modal
        wrapClassName="custom-modal"
        width="1000px"
        maskStyle={{ top: '94px', left: '100px' }}
        title={`角色信息【${type === 'add' ? '新增' : detail.code}】`}
        visible={updateModalVisible}
        onCancel={() => bindEvent('close')}
        maskClosable={false}
        getContainer={false}
        footer={(
          <>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.add}>新增</Button>
            <Button type="primary" icon={<DeliveredProcedureOutlined />} onClick={this.submitForm} loading={loadingSave}>保存</Button>
            <Button type="primary" icon={<DeleteOutlined />} disabled={type === 'add'} onClick={this.deleteEvent} loading={loadingDelete}>删除</Button>
            <Button type="primary" icon={<CloseCircleOutlined />} onClick={() => bindEvent('close')}>关闭</Button>
          </>
        )}
      >
        <Tabs activeKey={tabKey} type="card" size="small" onChange={this.changeTab}>
          {TabList.map(item => (
            <TabPane tab={item.title} key={item.key} disabled={type === 'add' && item.key !== 'baseInfo'}>
              {item.key === 'baseInfo' && <BaseInfo refs={this.baseInfoRef} detail={detail} type={type} />}
              {item.key === 'authoriza' &&
                <Authoriza
                  list={authorizaList}
                  changeItem={this.changeItem}
                  checkAll={this.checkAll}
                />}
              {item.key === 'roleMember' && <RoleMember id={detail.id} />}
            </TabPane>
          ))}
        </Tabs>
      </Modal>
    )
  }
}

export default connect(({ character }) => ({
}))(UpdateModal);