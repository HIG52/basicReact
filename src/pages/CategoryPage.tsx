import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <h1>카테고리 페이지</h1>
      <p>선택된 카테고리 ID: {categoryId}</p>
    </div>
  );
};

export default CategoryPage; 