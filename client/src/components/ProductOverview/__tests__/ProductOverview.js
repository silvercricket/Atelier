import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import ProductOverview from '../ProductOverview.jsx';
import productsReducer from '../../../store/productsSlice.js';
import cartReducer from '../../../store/cartSlice.js';
import {getProducts, getProductStyles, getProductDetails} from '../../../store/productsSlice.js';

// jest.mock('../../../store/productsSlice.js', () => ({
//   getProducts: jest.fn(() => Promise.resolve({ payload: [mockProductDetails] })),
//   getProductDetails: jest.fn(() => Promise.resolve({ payload: mockProductDetails })),
//   getProductStyles: jest.fn(() => Promise.resolve({ payload: mockProductStyles })),
// }));

const mockProductDetails = {
  id: 40344,
  name: "Camo Onesie",
  category: "Jackets",
  default_price: "140.00",
  features: [
    { feature: "Fabric", value: "Canvas" },
    { feature: "Buttons", value: "Brass" }
  ]
};

const mockProductStyles = {
  product_id: "40344",
  results: [
    {
      style_id: 240500,
      name: "Forest Green & Black",
      original_price: "140.00",
      "default?": true,
      photos: [
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        },
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
        },
      ],
      skus: {
        "1394769": { quantity: 8, size: "XS" },
        "1394770": { quantity: 16, size: "S" }
      }
    }
  ]
};

function createTestStore() {
  return configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer
    },
    initialState: {
      products: {
        currentProduct: 40344,
        productDetails: { '40344': mockProductDetails },
        productStyles: { '40344': mockProductStyles },
        status: 'succeeded',
        error: null
      },
      cart: {
        cart:[],
        status: 'succeeded',
        error: null
      }
    }
  });
}

describe('ProductOverview Component', () => {
  let store;
  let user;

  beforeEach(() => {
    store = createTestStore();
    user = userEvent.setup();
  });


  test('renders product details correctly', async () => {
    render(
      <Provider store={store}>
        <ProductOverview />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /camo onesie/i })).toBeInTheDocument();
      expect(screen.getByText(/jackets/i)).toBeInTheDocument();
      expect(screen.getByText(/\$140\.00/)).toBeInTheDocument();
    });
  });


  test('displays correct style options', async () => {
    render(
      <Provider store={store}>
        <ProductOverview />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/forest green & black/i)).toBeInTheDocument();
    });
  });


  test('handles size selection', async () => {
    render(
      <Provider store={store}>
        <ProductOverview />
      </Provider>
    );

    await screen.findByText(/camo onesie/i);

    const sizeSelect = screen.getByTestId('size-selector');
    await user.selectOptions(sizeSelect, 'XS');

    expect(sizeSelect).toHaveValue('XS');

    const quantitySelect = screen.getByTestId('quantity-selector');
    expect(quantitySelect).not.toBeDisabled();
  });


  // test('dispatches actions to fetch data on mount', () => {

  //   render(
  //     <Provider store={store}>
  //       <ProductOverview />
  //     </Provider>
  //   );

  //   expect(getProducts).toHaveBeenCalled();
  //   expect(getProductDetails).toHaveBeenCalled();
  //   expect(getProductStyles).toHaveBeenCalled();
  // });

});