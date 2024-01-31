import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title, price, image, category }) => {
  return (
    <Link to={`/tienda/${id}`}>
      <div key={id} className='group relative'>
        <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
          <img src={image} alt={title} className='h-full w-full object-cover' />
        </div>
        <div className='mt-4 flex justify-between '>
          <div>
            <h3 className='text-sm text-gray-700'>
              <span aria-hidden='true' className='absolute inset-0' />
              {title}
            </h3>
            <p className='mt-1 text-sm text-gray-500'>{category}</p>
          </div>
          <p className='text-sm font-medium text-gray-900'>${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
