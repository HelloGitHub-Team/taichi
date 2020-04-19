// 思路整理：
//  1. 自动生成表格分页配置项
//  2. 自动获取form表单中的参数

import { WrappedFormUtils } from 'antd/lib/form/Form';
import { PaginationConfig } from 'antd/es/pagination';
import { useEffect, useState } from 'react';
import { TableProps } from 'antd/es/table';

interface IOptions {
  form?: WrappedFormUtils;
  pagination?: PaginationConfig;
}

interface XXX<T = any> {
  tableProps: TableProps<T>;
  // search: { submit: () => void, reset: () => void }
}

export interface IPageKey {
  current: number;
  pageSize: number;
}

interface IResponseData<T = any> {
  total: number;
  list: T[];
}

export type GetTableData<T = any> = ({ current, pageSize }: IPageKey) => Promise<IResponseData<T>>;
const useFormTable = <T = any>(getTableData: GetTableData<T>, options: IOptions = {}): XXX<T> => {
  const [loading, setLoading] = useState(false);
  const [pageKey, setPageKey] = useState<IPageKey>({
    current: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState<T[]>([]);
  const getTableDataWithLoading = ({ current, pageSize }: IPageKey) => {
    setLoading(true);
    getTableData({ current, pageSize })
      .then(response => {
        setDataSource(response.list);
        setTotal(response.total);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const onChange = (current: number, pageSize?: number) => {
    const size = pageSize || pageKey.pageSize;
    setPageKey({ current, pageSize: size });
  };
  const onShowSizeChange = (current: number, size: number) => {
    setPageKey({ current, pageSize: size });
  };
  useEffect(() => {
    getTableDataWithLoading(pageKey);
  }, [pageKey]);
  return {
    tableProps: {
      pagination: {
        hideOnSinglePage: true,
        showQuickJumper: true,
        showSizeChanger: true,
        ...pageKey,
        ...options.pagination,
        onChange,
        onShowSizeChange,
        total,
        showTotal: () => `总共${total}条数据`,
      },
      loading,
      dataSource, // 如果请求到的dataSource不能直接使用，需要自己从tableProps中取出来单独处理
    },
  };
};

export default useFormTable;
