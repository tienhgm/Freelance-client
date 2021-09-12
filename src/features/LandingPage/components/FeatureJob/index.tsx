import {
  AccountBookOutlined,
  DoubleRightOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  HeartOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
export default function FeatureJob() {
  return (
    <div className="feature px-36">
      <div className="flex justify-between mb-10">
        <div className="text-2xl font-medium">Feature Jobs</div>
        <div className="text-base">
          <a href="#" className="flex items-center view-more">
            Browse all jobs <DoubleRightOutlined className="mt-1 ml-1" />
          </a>
        </div>
      </div>
      <div className="shadow-2xl box">
        <Link to="/" className="h-40 box__item">
          {/* left */}
          <div className="flex items-center">
            <AccountBookOutlined style={{ fontSize: 45 }} />
            <div className="flex flex-col ml-4">
              <div className="text-lg box__item__title">
                Bilingual Event Support Speciallist
              </div>
              <div className="flex gap-4 box__item__content">
                <div className="flex items-center">
                  <EnvironmentOutlined className="mt-1" />
                  <div className="ml-1">Ha Noi</div>
                </div>
                <div className="flex items-center">
                  <LaptopOutlined className="mt-1" />
                  <div className="ml-1">Fulltime</div>
                </div>
                <div className="flex items-center">
                  <FieldTimeOutlined className="mt-1" />
                  <div className="ml-1">2 days ago</div>
                </div>
              </div>
            </div>
          </div>
          {/* end left */}
          {/* right */}
          <div className="flex flex-col gap-3">
            <div className="btn btn__apply">Apply</div>
            <div className="btn btn__save">
              <HeartOutlined className="mt-1" />
              <div className="ml-1">Save</div>
            </div>
          </div>
          {/* end right */}
        </Link>
        <Link to="/" className="h-40 box__item">
          {/* left */}
          <div className="flex items-center">
            <AccountBookOutlined style={{ fontSize: 45 }} />
            <div className="flex flex-col ml-4">
              <div className="text-lg box__item__title">
                Bilingual Event Support Speciallist
              </div>
              <div className="flex gap-4 box__item__content">
                <div className="flex items-center">
                  <EnvironmentOutlined className="mt-1" />
                  <div className="ml-1">Ha Noi</div>
                </div>
                <div className="flex items-center">
                  <LaptopOutlined className="mt-1" />
                  <div className="ml-1">Fulltime</div>
                </div>
                <div className="flex items-center">
                  <FieldTimeOutlined className="mt-1" />
                  <div className="ml-1">2 days ago</div>
                </div>
              </div>
            </div>
          </div>
          {/* end left */}
          {/* right */}
          <div className="flex flex-col gap-3">
            <div className="btn btn__apply">Apply</div>
            <div className="btn btn__save">
              <HeartOutlined className="mt-1" />
              <div className="ml-1">Save</div>
            </div>
          </div>
          {/* end right */}
        </Link>
        <Link to="/" className="h-40 box__item">
          {/* left */}
          <div className="flex items-center">
            <AccountBookOutlined style={{ fontSize: 45 }} />
            <div className="flex flex-col ml-4">
              <div className="text-lg box__item__title">
                Bilingual Event Support Speciallist
              </div>
              <div className="flex gap-4 box__item__content">
                <div className="flex items-center">
                  <EnvironmentOutlined className="mt-1" />
                  <div className="ml-1">Ha Noi</div>
                </div>
                <div className="flex items-center">
                  <LaptopOutlined className="mt-1" />
                  <div className="ml-1">Fulltime</div>
                </div>
                <div className="flex items-center">
                  <FieldTimeOutlined className="mt-1" />
                  <div className="ml-1">2 days ago</div>
                </div>
              </div>
            </div>
          </div>
          {/* end left */}
          {/* right */}
          <div className="flex flex-col gap-3">
            <div className="btn btn__apply">Apply</div>
            <div className="btn btn__save">
              <HeartOutlined className="mt-1" />
              <div className="ml-1">Save</div>
            </div>
          </div>
          {/* end right */}
        </Link>
        <Link to="/" className="h-40 box__item">
          {/* left */}
          <div className="flex items-center">
            <AccountBookOutlined style={{ fontSize: 45 }} />
            <div className="flex flex-col ml-4">
              <div className="text-lg box__item__title">
                Bilingual Event Support Speciallist
              </div>
              <div className="flex gap-4 box__item__content">
                <div className="flex items-center">
                  <EnvironmentOutlined className="mt-1" />
                  <div className="ml-1">Ha Noi</div>
                </div>
                <div className="flex items-center">
                  <LaptopOutlined className="mt-1" />
                  <div className="ml-1">Fulltime</div>
                </div>
                <div className="flex items-center">
                  <FieldTimeOutlined className="mt-1" />
                  <div className="ml-1">2 days ago</div>
                </div>
              </div>
            </div>
          </div>
          {/* end left */}
          {/* right */}
          <div className="flex flex-col gap-3">
            <div className="btn btn__apply">Apply</div>
            <div className="btn btn__save">
              <HeartOutlined className="mt-1" />
              <div className="ml-1">Save</div>
            </div>
          </div>
          {/* end right */}
        </Link>
      </div>
    </div>
  );
}