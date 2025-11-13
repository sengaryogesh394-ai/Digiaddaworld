import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sale from '@/models/Sale';

// GET /api/sales/[id] - Get a specific sale by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    const sale = await Sale.findById(id);

    if (!sale) {
      return NextResponse.json(
        { success: false, error: 'Sale not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: sale
    });

  } catch (error: any) {
    console.error('Error fetching sale:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sale' },
      { status: 500 }
    );
  }
}

// PUT /api/sales/[id] - Update a sale record
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();

    const sale = await Sale.findById(id);

    if (!sale) {
      return NextResponse.json(
        { success: false, error: 'Sale not found' },
        { status: 404 }
      );
    }

    // Update fields
    Object.keys(body).forEach(key => {
      if (body[key] !== undefined) {
        sale[key] = body[key];
      }
    });

    // Set payment completion time if status changed to success
    if (body.paymentStatus === 'success' && sale.paymentStatus !== 'success') {
      sale.paymentCompletedAt = new Date();
      sale.orderStatus = 'completed';
    }

    await sale.save();

    return NextResponse.json({
      success: true,
      data: sale,
      message: 'Sale updated successfully'
    });

  } catch (error: any) {
    console.error('Error updating sale:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update sale' },
      { status: 500 }
    );
  }
}

// DELETE /api/sales/[id] - Delete a sale record
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    const sale = await Sale.findById(id);

    if (!sale) {
      return NextResponse.json(
        { success: false, error: 'Sale not found' },
        { status: 404 }
      );
    }

    await Sale.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Sale deleted successfully'
    });

  } catch (error: any) {
    console.error('Error deleting sale:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete sale' },
      { status: 500 }
    );
  }
}
