import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from '../../../../wayfinder'
/**
* @see \App\Http\Controllers\OAuthController::redirectToGoogleOAuth
 * @see app/Http/Controllers/OAuthController.php:15
 * @route '/auth/google/redirect'
 */
export const redirectToGoogleOAuth = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirectToGoogleOAuth.url(options),
    method: 'get',
})

redirectToGoogleOAuth.definition = {
    methods: ["get","head"],
    url: '/auth/google/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OAuthController::redirectToGoogleOAuth
 * @see app/Http/Controllers/OAuthController.php:15
 * @route '/auth/google/redirect'
 */
redirectToGoogleOAuth.url = (options?: RouteQueryOptions) => {
    return redirectToGoogleOAuth.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OAuthController::redirectToGoogleOAuth
 * @see app/Http/Controllers/OAuthController.php:15
 * @route '/auth/google/redirect'
 */
redirectToGoogleOAuth.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirectToGoogleOAuth.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OAuthController::redirectToGoogleOAuth
 * @see app/Http/Controllers/OAuthController.php:15
 * @route '/auth/google/redirect'
 */
redirectToGoogleOAuth.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirectToGoogleOAuth.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OAuthController::redirectToGoogleOAuth
 * @see app/Http/Controllers/OAuthController.php:15
 * @route '/auth/google/redirect'
 */
    const redirectToGoogleOAuthForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirectToGoogleOAuth.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OAuthController::redirectToGoogleOAuth
 * @see app/Http/Controllers/OAuthController.php:15
 * @route '/auth/google/redirect'
 */
        redirectToGoogleOAuthForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirectToGoogleOAuth.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OAuthController::redirectToGoogleOAuth
 * @see app/Http/Controllers/OAuthController.php:15
 * @route '/auth/google/redirect'
 */
        redirectToGoogleOAuthForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirectToGoogleOAuth.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirectToGoogleOAuth.form = redirectToGoogleOAuthForm
/**
* @see \App\Http\Controllers\OAuthController::handleGoogleCallback
 * @see app/Http/Controllers/OAuthController.php:20
 * @route '/auth/google/callback'
 */
export const handleGoogleCallback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handleGoogleCallback.url(options),
    method: 'get',
})

handleGoogleCallback.definition = {
    methods: ["get","head"],
    url: '/auth/google/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OAuthController::handleGoogleCallback
 * @see app/Http/Controllers/OAuthController.php:20
 * @route '/auth/google/callback'
 */
handleGoogleCallback.url = (options?: RouteQueryOptions) => {
    return handleGoogleCallback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OAuthController::handleGoogleCallback
 * @see app/Http/Controllers/OAuthController.php:20
 * @route '/auth/google/callback'
 */
handleGoogleCallback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handleGoogleCallback.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OAuthController::handleGoogleCallback
 * @see app/Http/Controllers/OAuthController.php:20
 * @route '/auth/google/callback'
 */
handleGoogleCallback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: handleGoogleCallback.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OAuthController::handleGoogleCallback
 * @see app/Http/Controllers/OAuthController.php:20
 * @route '/auth/google/callback'
 */
    const handleGoogleCallbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: handleGoogleCallback.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OAuthController::handleGoogleCallback
 * @see app/Http/Controllers/OAuthController.php:20
 * @route '/auth/google/callback'
 */
        handleGoogleCallbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: handleGoogleCallback.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OAuthController::handleGoogleCallback
 * @see app/Http/Controllers/OAuthController.php:20
 * @route '/auth/google/callback'
 */
        handleGoogleCallbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: handleGoogleCallback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    handleGoogleCallback.form = handleGoogleCallbackForm
const OAuthController = { redirectToGoogleOAuth, handleGoogleCallback }

export default OAuthController