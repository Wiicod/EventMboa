<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Helpers\RestHelper;
use App\Http\Requests;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        return RestHelper::get(Contact::class);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Requests\ContactRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\ContactRequest $request)
    {
        //

        return RestHelper::store(Contact::class, $request->all());

    }

    /**
     * Get a Contact
     *
     * Makes an OSBuddy API call and returns `Contact` object
     *
     * @Get("/contact/{id}")
     * @Parameters({
     *      @Parameter("id", description="The ID of the item you wish to view", type="integer", required=true),
     * })
     *
     * @param int $id 2
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        // dd($id);


        return RestHelper::show(Contact::class, $id);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Requests\ContactRequest $request, $id)
    {
        //
        return RestHelper::update(Contact::class, $request->all(), $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return RestHelper::delete(Contact::class, $id);
    }
}
