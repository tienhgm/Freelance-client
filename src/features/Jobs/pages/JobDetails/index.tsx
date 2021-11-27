import React, { useEffect, useState } from 'react';
import { Button, Tag, Comment, Avatar, Tooltip, Pagination, Breadcrumb, Skeleton } from 'antd';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { handleGetDetailJob } from 'app/slices/jobSlice';
import { useAppDispatch } from 'app/hooks';
import { timeFromNow, formatDate } from 'helpers/generate';
import { UserOutlined, CommentOutlined, HomeOutlined } from '@ant-design/icons';
import './styles.scss';
import moment from 'moment';
import JobItem from 'components/JobItem';

const { CheckableTag } = Tag;

export default function JobDetails() {
  const route = useRouteMatch<any>();
  const dispatch = useAppDispatch();
  let jobId = route.params.id;
  const [jobDetail, setJobDetail] = useState<any>({});
  const [bookmarkTag, setBookmarkTag] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const listCanApply = ['Inprogress', 'Await'];
  const handleChange = () => {
    setBookmarkTag((i) => (i = !i));
  };
  const getDetailJob = async () => {
    try {
      const { payload } = await dispatch(handleGetDetailJob(jobId));
      if (!!payload) {
        setJobDetail(payload.jobDetail);
        setRelatedJobs(payload.relatedJobs);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const history = useHistory();
  useEffect(() => {
    document.querySelector('.header > div > ul > li:nth-child(3) > a')?.classList.add('active');
    return () => {
      document.querySelector('.header > div > ul > li:nth-child(3) > a')?.classList.remove('active');
    };
  }, [history.location.pathname]);
  useEffect(() => {
    getDetailJob();
  }, [jobId]);
  return (
    <div className="job-details-page">
      <div className="relative mb-10 bg-gray-100 px-28 header-wrapper">
        <div className="absolute right-0 w-full header__background"></div>

        <div className="container relative flex flex-col justify-between m-auto page__header items-left lg:items-center lg:flex-row">
          <Skeleton active loading={loading} paragraph={{ rows: 4, width: 200 }} className="p-6">
            <div className="flex flex-col gap-5 header__left items-left lg:items-center pt-14 lg:py-14 lg:flex-row">
              <div className="general-info">
                <h2 className="text-3xl info__job-title">{jobDetail.title}</h2>
                {jobDetail.businessFields &&
                  jobDetail.businessFields.map((item: any) => (
                    <Tag className="text-xl font-medium" color="#2e3fe5" key={item.id}>
                      {item.name}
                    </Tag>
                  ))}
                <div className="flex items-center mt-2 text-base info__company gap-9">
                  <div className="company__name">
                    <i className="mr-1 text-xl bx bxs-buildings"></i>
                    <span>{jobDetail.company && jobDetail.company.name}</span>
                  </div>
                  <div className="flex items-center gap-1 company__rate">
                    <div className="px-2 font-bold text-white bg-yellow-400 rounded-sm rate__scores">
                      {jobDetail.company && jobDetail.company.stars}
                    </div>
                    {/* <Rate disabled defaultValue={jobDetail.company && Math.floor(jobDetail.company.stars)} /> */}
                    {jobDetail.company && jobDetail.company.stars && (
                      <div className="flex gap-1 text-yellow-400 rate__stars">
                        {Array(Math.floor(jobDetail.company.stars))
                          .fill(0)
                          .map((item: any) => (
                            <i className="text-2xl bx bxs-star" key={Math.random()}></i>
                          ))}
                      </div>
                    )}
                  </div>
                  {jobDetail.company && jobDetail.company.isVerified && (
                    <div className="flex items-center text-white bg-green-500 rounded-md company__status--verified">
                      <div className="px-1 bg-green-400 status__icon rounded-l-md">
                        <i className="bx bx-check"></i>
                      </div>
                      <span className="px-3 text-sm">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 info__post-time flex-nowrap">
                  <i className="text-xl bx bx-time-five"></i>
                  <span className="font-medium">{timeFromNow(jobDetail.createdAt)}</span>
                </div>
              </div>
            </div>
          </Skeleton>
          <Skeleton active loading={loading} paragraph={{ rows: 4 }} className="p-6">
            <div className="pt-3 mr-3 header_right pb-14 lg:py-6 lg:px-12 lg:rounded-md lg:bg-white lg:shadow-lg">
              <span className="text-base text-gray-400">Annual Salary</span>
              <br />
              <span className="flex justify-center text-2xl">${jobDetail.salary}</span>
            </div>
          </Skeleton>
        </div>
      </div>
      <div className="container flex flex-col m-auto px-28 content mt-14 lg:flex-row">
        <div className="w-full pl-6 lg:pr-10 content__main lg:w-2/3">
          <div className="mb-6 font-semibold">
            {loading ? (
              <Skeleton.Button active={true} size="small" style={{ width: 'calc(340px)' }} />
            ) : (
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">
                    <HomeOutlined className="relative -top-1" /> Home
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/find-jobs">Find Jobs</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{jobDetail.title}</Breadcrumb.Item>
              </Breadcrumb>
            )}
          </div>
          <div className="job-description">
            <h2 className="mt-2 mb-8 text-xl">Job Description</h2>
            {loading ? (
              <Skeleton active paragraph={{ rows: 14, width: '100%' }} />
            ) : (
              <div
                className="mb-10 text-base text-justify job-description__content"
                dangerouslySetInnerHTML={{ __html: jobDetail.description }}
              ></div>
            )}
          </div>
          <div className="mb-8 location">
            <h2 className="mt-2 mb-10 text-xl">Location</h2>
            <Skeleton active loading={loading} paragraph={{ rows: 7, width: '100%' }}>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDAHhcUacKG8mW34H9OPSh54v6ICnTZZMM&q=${
                  jobDetail.area && jobDetail.area.name
                }`}
                height="300"
                frameBorder="0"
                title="border:0;"
                allowFullScreen={true}
                aria-hidden="false"
                tabIndex={0}
                className="w-full"
              />
            </Skeleton>
          </div>
          <div className="mb-10 similar-jobs">
            <h2 className="flex flex-wrap mt-2 mb-10 text-xl">Similar Jobs</h2>
            {relatedJobs.map((job: any) => (
              <div className="inline-block w-full py-2">
                <Skeleton active loading={loading}>
                  <JobItem
                    key={job.id}
                    id={job.id}
                    skills={job.skills}
                    company={job.company && job.company.name}
                    companyLogo={job.company && `http://${job.company.logo}`}
                    jobTitle={job.title}
                    location={job.area && job.area.name}
                    jobType={job.workMode}
                    salary={job.salary}
                    postTime={job.createdAt}
                    startDate={job.startDate}
                    endDate={job.endDate}
                    level={job.experience}
                    loading={loading}
                  />
                </Skeleton>
              </div>
            ))}
          </div>
          <div className="mb-16 comment">
            <div className="mb-3 headline">
              <h3 className="m-0 text-lg">
                <CommentOutlined className="like relative -top-1.5 mr-2" /> Comment
              </h3>
            </div>
            <Skeleton active loading={loading}>
              <Comment
                author={<span className="text-sm font-semibold">Đặng Tuấn</span>}
                avatar={
                  <Avatar src="https://www.vasterad.com/themes/hireo/images/user-avatar-big-02.jpg" alt="Đặng Tuấn" />
                }
                content={
                  <p>
                    We supply a series of design principles, practical patterns and high quality design resources
                    (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
                  </p>
                }
                datetime={
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              />
            </Skeleton>
            {loading ? (
              <Skeleton.Button active={true} size="small" style={{ width: 'calc(200px)', marginTop: '20px' }} />
            ) : (
              <Pagination className="mt-3" size="small" defaultCurrent={1} total={30} />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-8 px-8 content__sidebar lg:w-1/3">
          {listCanApply.includes(jobDetail.status) && (
            <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
              <Button>
                Apply Now <i className="ml-2 bx bx-right-arrow-alt"></i>
              </Button>
            </Skeleton>
          )}

          <div className="w-full text-base job-summary">
            <h2 className="px-6 py-3 mb-0 text-xl font-medium bg-gray-200">Job Summary</h2>
            <Skeleton active loading={loading} paragraph={{ rows: 8, width: '100%' }}>
              <div className="flex items-center px-6 py-3 salary" style={{ background: '#f3f3f3' }}>
                <div className="mr-5 icon">
                  <i className="text-2xl bx bx-dollar-circle" style={{ color: '#2e3fe5' }}></i>
                </div>
                <div className="content">
                  <span className="font-normal">Salary</span>
                  <br />
                  <span className="font-medium">${jobDetail.salary}</span>
                </div>
              </div>
              <div className="flex items-center px-6 py-3 job-type" style={{ background: '#f3f3f3' }}>
                <div className="mr-5 icon">
                  <i className="text-2xl bx bxs-shopping-bags" style={{ color: '#2e3fe5' }}></i>
                </div>
                <div className="content">
                  <span className="font-normal">Work Mode</span>
                  <br />
                  <span className="font-medium">{jobDetail.workMode}</span>
                </div>
              </div>

              <div className="flex items-center px-6 py-3 job-type" style={{ background: '#f3f3f3' }}>
                <div className="mr-5 icon">
                  <UserOutlined className="text-2xl" style={{ color: '#2e3fe5' }} />
                  {/* <i className="text-2xl bx bxs-shopping-bags" style={{ color: '#2e3fe5' }}></i> */}
                </div>
                <div className="content">
                  <span className="font-normal">Level</span>
                  <br />
                  <span className="font-medium">{jobDetail.experience}</span>
                </div>
              </div>

              <div className="flex items-center px-6 py-3 date-posted" style={{ background: '#f3f3f3' }}>
                <div className="mr-5 icon">
                  <i className="text-2xl bx bx-time-five" style={{ color: '#2e3fe5' }}></i>
                </div>
                <div className="content">
                  <span className="font-normal">Available Time</span>
                  <br />
                  <span className="font-medium">
                    {formatDate(jobDetail.startDate)} -{'>'} {formatDate(jobDetail.endDate)}
                  </span>
                </div>
              </div>
            </Skeleton>
          </div>
          <div className="mt-4 skills">
            <div className="text-xl font-medium">Skills require</div>
            <div className="block mt-2 skills-tags">
              <Skeleton active loading={loading} paragraph={{ rows: 1, width: '100%' }}>
                {jobDetail.businessFields &&
                  jobDetail.skills.map((item: any) => <span key={item.id}>{item.name}</span>)}
              </Skeleton>
            </div>
          </div>
          <div className="mt-4 transition bookmark">
            <h4 className="mb-8 text-xl font-medium">Bookmark</h4>
            <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
              <CheckableTag checked={bookmarkTag} onChange={handleChange} className="bookmark-tag custom-tag">
                <span className="bookmark-icon rounded-l bg-gray-600 px-3.5 py-3">
                  <i className="bx bxs-star"></i>
                </span>
                <span className="bookmark-text rounded-r px-3.5 py-3 bg-gray-700">Bookmark</span>
              </CheckableTag>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
