import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import '../../styles/Home.css';

const Main: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await apiService.getMainMessage();
                if (response.success) {
                    setMessage(response.data?.mainMessage || response.message);
                } else {
                    setMessage(response.message);
                }
            } catch (error) {
                console.error('Error fetching message:', error);
                setMessage('Error loading message');
            }
        };

        fetchMessage();
    }, []);

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="container">
                    <h1>MCST에 오신 것을 환영합니다</h1>
                    <p className="page-description">{message}</p>
                </div>
            </div>
            
            <div className="container">
                <div className="features-container">
                    <div className="feature-card">
                        <h3>자유게시판</h3>
                        <p>개발자들과 자유롭게 의견을 나누고 소통하는 공간입니다.</p>
                        <Link to="/board" className="feature-link">자유게시판 바로가기</Link>
                    </div>
                    
                    <div className="feature-card">
                        <h3>Q&A</h3>
                        <p>개발 과정에서 궁금한 점을 물어보고 답변을 받아보세요.</p>
                        <Link to="/qna" className="feature-link">Q&A 바로가기</Link>
                    </div>
                    
                    <div className="feature-card">
                        <h3>공지사항</h3>
                        <p>중요한 소식과 업데이트 정보를 확인하세요.</p>
                        <Link to="/notice" className="feature-link">공지사항 바로가기</Link>
                    </div>
                </div>
                
                <div className="info-container">
                    <div className="info-section">
                        <h2>MCST 소개</h2>
                        <p>영등포에 있는 MCST 회사</p>
                        <p>React, SpringBoot JAVA를 사용해서 개발중인 MCLAB 프로젝트 이다.</p>
                    </div>
                    
                    <div className="info-section">
                        <h2>주요 기능</h2>
                        <ul className="feature-list">
                            <li>자유게시판</li>
                            <li>Q&A</li>
                            <li>공지사항</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main; 