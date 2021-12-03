import './index.scss';
import { Tabs, Input, Select, Pagination } from 'antd';
import TableCandidates from './components/tableCandidates';
import {
  handleChangeApplyStatus,
  handleDeleteEmployeeFromJob,
  handleGetJobCandidates,
  handleGetJobEmployees,
} from 'app/slices/jobSlice';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
import { applyStatus, jobEmployeeStatus } from 'utils/enum';
import queryString from 'query-string';
import TableEmployees from './components/tableEmployees';
const { TabPane } = Tabs;
const { Option } = Select;
export default function DetailJob() {
  const history = useHistory();
  const location = useLocation();
  const [key, setKey] = useState<any>(
    queryString.parse(location.search).key ? queryString.parse(location.search).key : '1'
  );
  const [infoNeed, setInfoNeed] = useState<any>({
    maxEmployees: 0,
    totalEmployees: 0,
  });
  function callback(key: string) {
    setKey(key);
  }
  const [listJobCandidates, setListJobCandidates] = useState<any>([]);
  const [listJobEmployees, setListJobEmployees] = useState<any>([]);
  const [filtersCandidate, setFiltersCandidate] = useState<any>({
    name: '',
    applyStatus: null,
    appliedAt: '',
  });
  const [filtersEmployee, setFiltersEmployee] = useState<any>({
    name: '',
    jobEmployeeStatus: null,
    joinedAt: '',
  });
  const [loading, setLoading] = useState(false);
  const match = useRouteMatch<any>();
  let jobId = match.params.id;
  const dispatch = useAppDispatch();
  const getListCandidates = async (jobId: string) => {
    let listFilter = { ...filtersCandidate, page: 1, records: 999 };
    for (const key in listFilter) {
      if (listFilter[key] === undefined || listFilter[key] === null || listFilter[key] === '') {
        delete listFilter[key];
      }
    }
    const data = [jobId, listFilter];
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetJobCandidates(data));
      if (payload) {
        setInfoNeed((prev: any) => ({
          ...prev,
          maxEmployees: payload.maxEmployees,
          totalEmployees: payload.totalEmployees,
        }));
        let candidates = payload.candidates.map((item: any) => {
          return {
            ...item,
            fullName: item.user.firstName + ' ' + item.user.lastName,
          };
        });
        setListJobCandidates(candidates);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const getListEmployees = async (jobId: string) => {
    let listFilter = { ...filtersEmployee, page: 1, records: 999 };
    for (const key in listFilter) {
      if (listFilter[key] === undefined || listFilter[key] === null || listFilter[key] === '') {
        delete listFilter[key];
      }
    }
    const data = [jobId, listFilter];
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetJobEmployees(data));
      if (payload) {
        setInfoNeed((prev: any) => ({
          ...prev,
          maxEmployees: payload.maxEmployees,
          totalEmployees: payload.totalEmployees,
        }));
        let employees = payload.employees.map((item: any) => {
          return {
            ...item,
            fullName: item.user.firstName + ' ' + item.user.lastName,
          };
        });
        setListJobEmployees(employees);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const handleSearchNameEmployee = (e: any) => {
    setFiltersEmployee((prev: any) => ({ ...prev, name: e.target.value }));
  };
  const handleSearchNameCandidate = (e: any) => {
    setFiltersCandidate((prev: any) => ({ ...prev, name: e.target.value }));
  };
  const handleApplyStatus = (value: any) => {
    setFiltersCandidate((prev: any) => ({ ...prev, applyStatus: value }));
  };
  const handleWorkingStatus = (value: any) => {
    setFiltersEmployee((prev: any) => ({ ...prev, jobEmployeeStatus: value }));
  };
  const handleUpdateApplyStatus = async (data: any) => {
    try {
      await dispatch(handleChangeApplyStatus(data));
    } catch (error) {}
  };
  const handleDeleteEmployee = async (data: any) => {
    try {
      await dispatch(handleDeleteEmployeeFromJob(data));
    } catch (error) {}
  };

  useEffect(() => {
    history.push({
      pathname: `/dashboard/jobs-manage/${jobId}`,
      search: `?key=${key}`,
    });
    if (key === '2') {
      getListCandidates(jobId);
    }
    if (key === '1') {
      getListEmployees(jobId);
    }
  }, [jobId, key, filtersCandidate, filtersEmployee]);
  return (
    <div className="h-full candidate-manage">
      <div className="flex gap-2 mb-4 text-lg font-medium">
        <Link to="/dashboard/jobs-manage">Manage jobs</Link> {' > '}
        <div>
          {key === '1' && 'Manage employees'}
          {key === '2' && 'Manage candidates'}
        </div>
      </div>
      <div className="candidate">
        <div>
          <div className="flex justify-end gap-3 px-6">
            {key === '1' && (
              <>
                <div style={{ width: 'calc(160px)' }}>
                  <Input
                    value={filtersEmployee.name}
                    onChange={handleSearchNameEmployee}
                    placeholder="Search by name..."
                  />
                </div>
                <div style={{ width: 'calc(160px)' }}>
                  <Select
                    placeholder="Work status"
                    allowClear
                    style={{ width: 150 }}
                    value={filtersEmployee.applyStatus}
                    onChange={handleWorkingStatus}
                  >
                    {jobEmployeeStatus.map((item) => (
                      <Option value={item} key={Math.random()}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </div>
              </>
            )}
            {key === '2' && (
              <>
                <div style={{ width: 'calc(160px)' }}>
                  <Input
                    value={filtersEmployee.name}
                    onChange={handleSearchNameCandidate}
                    placeholder="Search by name..."
                  />
                </div>
                <div style={{ width: 'calc(160px)' }}>
                  <Select
                    placeholder="Apply status"
                    allowClear
                    style={{ width: 150 }}
                    value={filtersCandidate.applyStatus}
                    onChange={handleApplyStatus}
                  >
                    {applyStatus.map((item) => (
                      <Option value={item} key={Math.random()}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </div>
              </>
            )}
          </div>
          {/* @ts-ignore */}
          <Tabs size="large" defaultActiveKey={key} onChange={callback}>
            <TabPane tab="List employees" key="1">
              <TableEmployees
                handleUpdateWorkStatus={handleDeleteEmployee}
                data={listJobEmployees}
                loading={loading}
                infoNeed={infoNeed}
              />
            </TabPane>
            <TabPane tab="List candidates" key="2">
              <TableCandidates
                handleUpdateApplyStatus={handleUpdateApplyStatus}
                data={listJobCandidates}
                loading={loading}
                infoNeed={infoNeed}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
