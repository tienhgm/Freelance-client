import './index.scss';
import { FolderOpenOutlined } from '@ant-design/icons';
import { Input, Select, Slider, DatePicker, Form, Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import CkEditor from 'components/Editor';
import { handleGetSkills } from 'app/slices/resourceSlice';
import { useAppDispatch } from 'app/hooks';
import { listLevel, listWorkMode } from 'utils/enum';
import { convertDateToString } from 'helpers/generate';
import { handleGetDetailJob, handlePostJob, handleUpdateJob } from 'app/slices/jobSlice';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
const { Option } = Select;
export default function PostJob() {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [jobSalary, setJobSalary] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [listSkills, setListSkills] = useState([]);
  const [detailJob, setDetailJob] = useState<any>({});
  const dispatch = useAppDispatch();
  const match = useRouteMatch<any>();
  const jobId = match.params.id;
  const handleSetJobSalary = (value: number) => {
    setJobSalary(value);
  };
  const watchJobDescription = (value: any) => {
    setJobDescription(value);
  };
  const getSkill = async () => {
    const { payload } = await dispatch(handleGetSkills());
    setListSkills(payload);
  };
  const getDetailJob = async (jobId: string) => {
    try {
      const { payload } = await dispatch(handleGetDetailJob(jobId));
      if (!!payload) {
        setDetailJob(payload.jobDetail);
        const skills = payload.jobDetail.skills;
        let listSkillIds:any = [];
        skills.map((e: any) => {listSkillIds.push(e.id)});
        form.setFieldsValue({
          title: payload.jobDetail.title,
          workMode: payload.jobDetail.workMode,
          maxEmployees: payload.jobDetail.maxEmployees,
          salary: payload.jobDetail.salary,
          skillIds: listSkillIds,
          experience: payload.jobDetail.experience,
          rangePicker: [moment(payload.jobDetail.startDate), moment(payload.jobDetail.endDate)],
        });
        setJobDescription(payload.jobDetail.description);
        setJobSalary(payload.jobDetail.salary);
      }
    } catch (error) {}
  };
  const onFinish = async (values: any) => {
    values.startDate = convertDateToString(values.rangePicker[0]._d);
    values.endDate = convertDateToString(values.rangePicker[1]._d);
    values.businessFieldIds = [];
    values.areaId = 0;
    values.minEmployees = 1;
    values.description = jobDescription;
    delete values.rangePicker;
    if (!jobId) {
      await dispatch(handlePostJob(values));
    } else {
      const payload = [jobId, values];
      await dispatch(handleUpdateJob(payload));
    }
  };

  useEffect(() => {
    getSkill();
    return () => {
      setListSkills([]);
    };
  }, []);
  useEffect(() => {
    if (!!jobId) {
      getDetailJob(jobId);
    }
  }, [jobId]);
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="h-full job-block">
        <div className="flex gap-1 mb-4 text-lg">
          <Link to="/dashboard/jobs-manage">Manage jobs</Link> {'>'}{' '}
          <div className="font-medium">{detailJob && detailJob.title}</div>
        </div>

        <div className="postJobs">
          <div className="postJobs__title">
            <div className="flex items-center mb-4 ">
              <FolderOpenOutlined style={{ color: '#2e3fe5' }} className="mt-1 mr-4" />
              {jobId ? 'Edit' : 'Post a job'}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap w-full gap-4">
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Job Title</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="title" rules={[{ required: true, message: 'Please input job title' }]}>
                  <Input size="large" placeholder="Job title" />
                </Form.Item>
              </div>
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Work mode</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="workMode" rules={[{ required: true, message: 'Select work mode' }]}>
                  <Select allowClear size="large" style={{ width: '100%' }} placeholder="Select work mode">
                    {listWorkMode.map((item: any, idx: number) => (
                      <Option value={item} key={idx}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Number of employees required</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item
                  name="maxEmployees"
                  rules={[{ required: true, message: 'Please input number of employees' }]}
                >
                  <Input type="number" min="0" size="large" placeholder="Number of employees" />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-4">
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Salary</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <div className="text-base font-medium">${jobSalary}</div>
                <Form.Item name="salary" rules={[{ required: true, message: 'Select work mode' }]}>
                  <Slider max={1500} onChange={handleSetJobSalary} />
                </Form.Item>
              </div>
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Skills</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="skillIds" rules={[{ required: true, message: 'Select skills' }]}>
                  <Select mode="multiple" allowClear size="large" style={{ width: '100%' }} placeholder="Choose Skills">
                    {listSkills?.map((item: any) => (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Experience</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="experience" rules={[{ required: true, message: 'Select skills' }]}>
                  <Select allowClear size="large" style={{ width: '100%' }} placeholder="Choose experience">
                    {listLevel?.map((item: any, idx: number) => (
                      <Option value={item} key={idx}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-wrap w-full">
              <div style={{ width: 'calc(100%)' }}>
                <div className="flex gap-1">
                  <h2>Available Time</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="rangePicker" rules={[{ required: true, message: 'Select available time' }]}>
                  <RangePicker size="large" />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-wrap w-full">
              <div style={{ width: 'calc(93%)' }}>
                <div className="flex gap-1">
                  <h2>Job Description</h2> <span className="required-field">*</span>
                </div>
                <CkEditor valueChange={jobDescription} handleChange={watchJobDescription} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-6 mt-4">
        <Button type="primary" size="large" htmlType="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}
