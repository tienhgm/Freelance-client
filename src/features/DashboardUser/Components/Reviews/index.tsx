import { DeleteOutlined, EditOutlined, FieldTimeOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons';
import { Rate, Pagination, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetReviews } from 'app/slices/userSlice';
import Popup from 'components/Popup';
import { useEffect, useState } from 'react';
import './index.scss';
export default function Reviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [pageIdxAboutMe, setPageIdxAboutMe] = useState(1);
  const handleDeleteReview = (id: any) => {
    console.log('delete');
  };
  const userId = useAppSelector((state) => state.auth.user.id);
  const dispatch = useAppDispatch();
  const getReviews = async () => {
    let filters = { page: pageIdxAboutMe };
    try {
      setIsLoading(true);
      await dispatch(handleGetReviews({ userId, filters }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const changePageIdxAboutMe = (idx: any) => {
    setPageIdxAboutMe(idx);
  };
  useEffect(() => {
    getReviews();
  }, [pageIdxAboutMe]);
  return (
    <div className="reviews">
      <div className="reviews__title">Reviews</div>
      <div className="flex flex-wrap gap-8 mt-8">
        <div className="reviews__left">
          <div className="title">
            <ProfileOutlined style={{ color: '#2e3fe5', paddingRight: '5px' }} /> Reviews about me
          </div>
          <div className="block">
            {!isLoading ? (
              <>
                <div className="block__label">Work in station live</div>
                <div className="flex gap-4">
                  <Rate disabled defaultValue={3.5} allowHalf />
                  <div className="text-lg block__date">
                    <FieldTimeOutlined /> <span style={{ color: '#808080' }}>Oct 2021</span>
                  </div>
                </div>
                <div className="mt-2 mb-2 font-medium break-words">1234</div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 btn btn__edit">
                    <EditOutlined /> Edit review
                  </div>
                  <div className="flex items-center gap-1 btn btn__delete" onClick={() => setOpenDialogConfirm(true)}>
                    <DeleteOutlined /> Delete
                  </div>
                </div>
              </>
            ) : (
              <Skeleton active paragraph={{ rows: 2 }}/>
            )}
          </div>
          <div className="flex justify-end mt-4 mb-4 mr-4">
            <Pagination defaultCurrent={pageIdxAboutMe} total={50} onChange={changePageIdxAboutMe} />
          </div>
          <Popup
            title="Delete Review"
            isVisible={openDialogConfirm}
            popupText="Delete?"
            handleConfirm={handleDeleteReview}
            handleCancelConfirm={() => setOpenDialogConfirm(false)}
          />
        </div>
        <div className="reviews__right">
          <div className="title">
            <TeamOutlined style={{ color: '#2e3fe5', paddingRight: '5px' }} /> Rate Jobs
          </div>

          <div className="flex justify-end mt-4 mb-4 mr-4">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
}