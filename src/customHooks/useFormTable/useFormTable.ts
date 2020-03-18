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
  // loading: boolean;
  // submit: () => void;
  // reset: () => void;
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
  const { pagination = {} } = options;
  const { defaultCurrent = 10, defaultPageSize = 10 } = pagination;
  const [loading, setLoading] = useState(false);
  const [pageKey, setPageKey] = useState<IPageKey>({
    current: pagination.current || defaultCurrent,
    pageSize: pagination.pageSize || defaultPageSize,
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
    setPageKey({ current, pageSize: pageSize || pageKey.pageSize });
  };

  useEffect(() => {
    getTableDataWithLoading(pageKey);
  }, [pageKey]);
  return {
    tableProps: {
      ...options,
      pagination: {
        ...pageKey,
        onChange,
        total,
        showTotal: () => `总共${total}条数据`,
      },
      loading,
      dataSource, // 如果请求到的dataSource不能直接使用，需要自己从tableProps中取出来单独处理
    },
  };
};

export default useFormTable;
